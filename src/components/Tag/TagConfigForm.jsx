import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ColorPicker from '../common/ColorPicker';

import { addTag, updateTag } from './TagsListActions';
import SelectFieldGroup from '../common/SelectFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import WordList from '../WordList';

import './Tag.css';

function splitLabel(label) {
  const parts = label.split('::');
  return {
    label: parts[parts.length - 1],
    nest: parts.slice(0, parts.length - 1).join('::')
  };
}

function getStateFromTag(tag, opts = {}) {
  const nest = tag.label ? splitLabel(tag.label) : {};
  return Object.assign({}, tag, nest, opts);
}

function getTagFromState(state) {
  const label =
    state.nest !== '' ? [state.nest, state.label].join('::') : state.label;
  return {
    id: state.id,
    label,
    patterns: state.patterns.filter(p => p !== ''),
    color: state.color
  };
}

class TagConfigForm extends React.Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      id: '',
      label: '',
      patterns: [''],
      color: '#969696',
      nest: '',
      dirty: false,
      errors: {}
    };
    this.state = Object.assign(
      {},
      this.defaultState,
      getStateFromTag(this.props.tag)
    );

    this.onAddPattern = this.onAddPattern.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangePattern = this.onChangePattern.bind(this);
    this.onRemovePattern = this.onRemovePattern.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.tag.id && this.props.tag.id !== nextprops.tag.id) {
      const newstate = getStateFromTag(nextprops.tag, { dirty: false });
      this.setState(newstate);
    }
  }

  onAddPattern() {
    this.setState({ patterns: [...this.state.patterns, ''] });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value, dirty: true });
  }

  onChangeColor(color) {
    this.setState({ color, dirty: true });
  }

  onChangePattern(e) {
    const idx = e.target.name.split('_')[1];
    const patterns = this.state.patterns.slice();
    patterns[idx] = e.target.value;
    this.setState({ patterns, dirty: true });
  }

  onRemovePattern(idx, e) {
    const patterns = this.state.patterns.slice();
    patterns.splice(idx, 1);
    this.setState({ patterns, dirty: true });
  }

  onReset() {
    const newstate = this.props.tag.id
      ? getStateFromTag(this.props.tag, { dirty: false })
      : this.defaultState;
    this.setState(newstate);
  }

  onSave() {
    const tag = getTagFromState(this.state);

    if (this.props.tag.id) {
      this.props.updateTag(Object.assign(tag, {selected: true}));
      this.setState({ dirty: false });
    } else {
      this.props.addTag(tag);
      this.setState(this.defaultState);
    }
  }

  render() {
    const optionsList = [{ label: '[none]', value: '' }].concat(
      this.props.tags
        .filter(t => !t.label.startsWith(this.props.tag.label))
        .map(t => ({ label: t.label, value: t.label }))
    );
    const patternsList =
      this.state.patterns.length !== 0 ? this.state.patterns : [''];
    const patterns = patternsList.map((p, idx, lst) => {
      const field = 'tagpattern_' + idx;
      return (
        <TextFieldGroup
          key={idx}
          field={field}
          label="Pattern"
          onChange={this.onChangePattern}
          onAddClick={this.onAddPattern}
          onRemoveClick={e => this.onRemovePattern(idx)}
          showAdd={idx === lst.length - 1}
          showRemove={true}
          value={p}
          error={this.state.errors.tagpattern}
        />
      );
    });

    return (
      <div id="configform">
        <div className="columntitle">{this.props.title}</div>
        <div>
          <TextFieldGroup
            field="label"
            label="Tag Name"
            onChange={this.onChange}
            value={this.state.label}
            error={this.state.errors.label}
          />

          {patterns}

          <div className="form-group">
            <label className="control-label">Color</label>
            <ColorPicker
              hex={this.state.color}
              onChangeColor={this.onChangeColor}
            />
          </div>

          <SelectFieldGroup
            field="nest"
            label="Nest under"
            onChange={this.onChange}
            options={optionsList}
            selected={this.state.nest}
          />
        </div>

        {this.state.label && this.state.dirty ? (
          <div className="button-group">
            <button className="button-white button" onClick={this.onReset}>
              Reset
            </button>
            <button
              className="button-small button-success button"
              onClick={this.onSave}
            >
              {this.props.tag.id ? 'Update' : 'Create'}
            </button>
          </div>
        ) : null}

        <WordList patterns={this.state.patterns} />
      </div>
    );
  }
}

TagConfigForm.propTypes = {
  tag: PropTypes.object,
  onReset: PropTypes.func,
  onSave: PropTypes.func
};

TagConfigForm.defaultProps = {
  tag: {},
  title: 'Tag Details',
  onReset: () => {},
  onSave: () => {}
};

function mapStateToProps(state) {
  return {
    tags: state.tags
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTag: tag => dispatch(addTag(tag)),
    updateTag: tag => dispatch(updateTag(tag))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TagConfigForm);
