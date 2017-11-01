import React from "react";
import { connect } from "react-redux";

class Section extends React.Component {
  render() {
    const account = this.props.accounts.filter(a => a.selected)[0];
    const title = account
      ? `${account.name} - ${this.props.title}`
      : this.props.title;

    return (
      <section className="views">
        <h2>{title}</h2>
        {this.props.children}
      </section>
    );
  }
}

Section.defaultProps = {
  accounts: [],
  title: "[no account]"
};

function mapStateToProps(state) {
  return {
    accounts: state.accounts
  };
}

export default connect(mapStateToProps)(Section);
