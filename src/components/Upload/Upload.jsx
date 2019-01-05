import React from "react";
import { connect } from "react-redux";

import { mergeTransactionLists } from "../../reducers/Transactions/utils";
import { mergeTransactions } from "../../reducers/Transactions";

import { parseCSVLine, parseHSBC } from "../../utils/TransactionParser";

import { TransactionsTable } from "../TransactionsList";
import { TagsList } from "../Tag";
import "./NewEntry.css";
import "../css/button.css";

function updateTransactions(transactions, payload) {
  return transactions.map(t => {
    if (t.id === payload.id) {
      return Object.assign({}, t, payload.values, { id: t.id });
    } else {
      return t;
    }
  });
}

const testLines = `Date31 May 18	Description
WHITESPACE GLOBAL WHITESPACE
Amount3,024.28	Balance not applicable
Date31 May 18	Description
WWW.GRAPETREE.CO.U 01384
596001
Amount-49.95	Balance3,784.14
Date31 May 18	Description
LUL TICKET MACHINE OVAL
Amount-131.00	Balance not applicable
Date01 Jun 18	Description
POD LONDON
EC1Y
Amount-5.99	Balance3,778.15
Date04 Jun 18	Description
TESCO STORE 2764 LONDON
Amount-57.82	Balance not applicable
Date04 Jun 18	Description
SAINSBURYS S/MKTS
LONDON,CITY R
Amount-1.65	Balance not applicable
Date04 Jun 18	Description
TESCO STORE 2764 LONDON
Amount-22.30	Balance not applicable
Date04 Jun 18	Description
400118 91681826 INTERNET
TRANSFER
Amount-1,800.00	Balance1,896.38
Date05 Jun 18	Description
MAPLIN LIVERPL ST LIVERPOOL
ST
Amount-2.00	Balance1,894.38
`;

const ENTER_KEY_CODE = 13;

class Upload extends React.Component {
  constructor(props) {
    console.log("new Upload");
    super(props);

    this.state = {
      value: testLines, // TOOD: remove testLines
      transactions: []
    };

    this.onCancel = this.onCancel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  updateTransaction = payload => {
    const transactions = updateTransactions(this.state.transactions, payload);
    this.setState({ transactions });
  };

  fixBalance = () => {
    let { transactions: _trs } = this.state;
    console.log("fixBalance");

    if (_trs.length < 2) return;
    const first = new Date(_trs[0]);
    const last = new Date(_trs[_trs.length - 1]);

    let transactions = first < last ? _trs.slice() : _trs.slice().reverse();
    let _missing = transactions.filter(tr => !tr.balance).length;
    let _round = 0;
    while (_missing && _round < 10) {
      console.log(`fix round=${_round} missing=${_missing}`);
      transactions = transactions.map(this._fixBalance);
      _missing = transactions.filter(tr => !tr.balance).length;
      _round += 1;
    }

    this.setState({ transactions });
  };

  _fixBalance = (tr, idx, transactions) => {
    if (tr.balance) return tr;

    if (idx > 0) {
      const prev = transactions[idx - 1];
      if (prev.balance) {
        return { ...tr, balance: prev.balance + tr.amount };
      }
    } else if (idx < transactions.length - 2) {
      const next = transactions[idx + 1];
      if (next.balance) {
        return { ...tr, balance: next.balance - next.amount };
      }
    }

    return tr;
  };

  validate = () => {
    const value = this.textInput.value;

    if (!value) {
      this.setState({
        value: "",
        transactions: []
      });
    }

    let transactions = [];
    if (this.textInput.value.startsWith("Date")) {
      const raw = parseHSBC(value);
      transactions = mergeTransactionLists(raw, []);
    } else {
      const raw = this.textInput.value
        .split("\n")
        .map(line => parseCSVLine(line))
        .filter(t => t);
      transactions = mergeTransactionLists(raw, []);
    }

    console.log("new transactions", transactions.length);
    this.setState({
      value: "",
      transactions
    });
  };

  onCancel(event) {
    this.setState({
      value: "",
      transactions: []
    });
  }

  onChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.validate();
    }
  }

  onSave(event) {
    this.props.mergeTransactions(this.state.transactions);
    this.setState({
      value: "",
      transactions: []
    });
  }

  render() {
    if (!this.state.transactions.length) {
      return (
        <div className="upload">
          <textarea
            className="newentry"
            rows={5}
            id="newentry"
            placeholder="paste csv lines here"
            onBlur={this.validate}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            value={this.state.value}
            ref={input => {
              this.textInput = input;
            }}
          />
          <div className="button-group">
            <button
              className="button-warning button"
              onClick={() => this.validate()}
            >
              Parse
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="transactionslistview">
            <TransactionsTable
              tags={this.props.tags}
              transactions={this.state.transactions}
              cost={this.cost}
            />
            <TagsList />
          </div>
          <div className="button-group">
            <button className="button" onClick={this.fixBalance}>
              Fix Balance
            </button>
            <button className="button-warning button" onClick={this.onCancel}>
              Cancel
            </button>
            <button className="button-success button" onClick={this.onSave}>
              Save
            </button>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    //transactions: state.transactions,
    tags: state.tags
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mergeTransactions: arr => dispatch(mergeTransactions(arr))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
