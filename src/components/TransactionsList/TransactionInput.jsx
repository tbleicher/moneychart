import React from "react";
import { connect } from "react-redux";

import { createTransaction } from "../../reducers/Transactions";

class TransactionInput extends React.Component {
  state = {
    amount: 0.0,
    balance: 0.0,
    date: "",
    description: ""
  };

  onClick = () => {
    const { account, createTransaction } = this.props;
    if (!account) return;

    const transaction = {
      ...this.state,
      date: new Date(this.state.date)
    };

    createTransaction(account.id, transaction);
  };

  onFill = () => {
    const transaction = {
      date: `2018-09-${Math.round(Math.random() * 20) + 10}`,
      amount: Math.round(Math.random() * 100, 2),
      balance: Math.round(Math.random() * 100, 2)
    };
    console.log(transaction);
    this.setState({ ...transaction });
  };

  render() {
    return (
      <div>

        <div className="transactionInput">
          <input
            className="dateInput"
            id="_date"
            type="date"
            value={this.state.date}
            onChange={evt => this.setState({ date: evt.target.value })}
          />
          <input
            className="descriptionInput"
            id="_description"
            value={this.state.description}
            onChange={evt => this.setState({ description: evt.target.value })}
          />
          <input
            className="valueInput"
            id="_amount"
            value={this.state.amount}
            onChange={evt => this.setState({ amount: evt.target.value })}
          />
          <input
            className="valueInput"
            id="_balance"
            value={this.state.balance}
            onChange={evt => this.setState({ balance: evt.target.value })}
          />

        </div>
        <div
          className="transactionInput"
          style={{ justifyContent: "space-between" }}
        >
          <button onClick={this.onFill}>fill</button>
          {this.props.account && <button onClick={this.onClick}>create</button>}
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    account: state.accounts.find(account => account.selected)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createTransaction: (accountId, data) => {
      dispatch(createTransaction(accountId, data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionInput);
