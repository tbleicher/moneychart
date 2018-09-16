import React from "react";
import { connect } from "react-redux";

import { addAccount } from "../../reducers/Accounts";

import "./Account.css";
import "../css/button.css";

class NewAccount extends React.Component {
  state = {
    name: "",
    number: "",
    password: ""
  };

  onClick = () => {
    const account = {
      transactions: [],
      tags: [],
      name: this.state.name,
      number: this.state.number,
      selected: true,
      fromDate: new Date(),
      toDate: new Date(),
      updatedDate: new Date()
    };

    this.props.addAccount(account);
    this.setState({
      name: "",
      number: "",
      password: ""
    });
  };

  render() {
    const { name, number, password } = this.state;

    const disabled = !name || !number || !password;
    const className = disabled
      ? "button button-disabled"
      : "button button-success";

    return (
      <div className="account">
        <div className="columntitle">Add new account</div>
        <div className="columnbody">
          <p>Account Name</p>
          <p>
            <input
              id="account_name"
              value={this.state.name}
              onChange={evt => this.setState({ name: evt.target.value })}
            />
          </p>
          <p>Account Number</p>
          <p>
            <input
              id="account_number"
              value={this.state.number}
              onChange={evt => this.setState({ number: evt.target.value })}
            />
          </p>

          <p>Please provide a password.</p>
          <p>
            <input
              type="password"
              value={this.state.password}
              onChange={evt => this.setState({ password: evt.target.value })}
            />
          </p>

          <button
            onClick={this.onClick}
            className={className}
            disabled={disabled}
          >
            add account
          </button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addAccount: account => dispatch(addAccount(account))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(NewAccount);
