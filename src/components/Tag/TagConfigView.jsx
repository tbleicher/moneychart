import React from 'react';
import { connect } from 'react-redux';

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
      <section className="views">
        <h2>Tag Config</h2>
        <div className="tagconfigview">
          <TagConfigForm tag={this.state.selected} />
          <TagsList tags={this.props.tags} onClick={this.props.onClick} />
        </div>
      </section>
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
