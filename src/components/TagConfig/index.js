import { connect } from "react-redux";

import TagConfigView from "./TagConfigView";

const mapStateToProps = state => {
  return {
    account: state.accounts.find(acc => acc.selected),
    tag: state.tags.find(tag => tag.selected)
  };
};

export default connect(mapStateToProps)(TagConfigView);
