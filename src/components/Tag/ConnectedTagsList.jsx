import { connect } from "react-redux";

import { selectTag } from "./TagsListActions";
import TagsList from "./TagsList";

function mapStateToProps(state) {
  const account = state.accounts.find(account => account.selected);

  return {
    tags: (account && account.tags) || []
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: label => dispatch(selectTag(label))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsList);
