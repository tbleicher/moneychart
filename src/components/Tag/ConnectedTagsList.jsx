import { connect } from 'react-redux';

import { selectTag } from './TagsListActions';
import TagsList from './TagsList';


function mapStateToProps(state) {
  return {
    tags: state.tags,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: label => dispatch(selectTag(label)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsList);