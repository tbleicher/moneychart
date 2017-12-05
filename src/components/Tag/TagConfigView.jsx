import React from 'react';
import { connect } from 'react-redux';

import Section from '../Section';
import TagConfigForm from './TagConfigForm';
import TagsList from './TagsList';
import { selectTag } from './TagsListActions';

import './Tag.css';
import './TagConfigView.css';

class TagConfigView extends React.Component {
  constructor(props) {
    super(props);

    const selected = this.props.tags.filter(t => t.selected)[0] || {};
    this.state = {
      selected
    };
  }
  
  componentWillReceiveProps(nextProps) {
    const selected = nextProps.tags.filter(t => t.selected)[0] || {};
    this.setState({ selected });
  }

  render() {
    return ( 
      <Section title="Tag Config">
        <div className="help">
          <p>You can create <i>category tags</i> that get
          automatically applied via text patterns. Check out the
          generated tags for examples.</p>
          <p>Tags can be nested. The selected color will be used in the charts.</p>
        </div>
        <div className="tagconfigview">
          <TagConfigForm tag={this.state.selected} />
          <TagsList tags={this.props.tags} onClick={this.props.onClick} />
        </div>
      </Section>
    );
  }
}

function mapStateToProps(state) {
  return {
    tags: state.tags
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: label => dispatch(selectTag(label))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TagConfigView);
