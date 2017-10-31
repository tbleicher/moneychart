import React from 'react';
import { connect } from 'react-redux';

import { TransactionsTable } from '../TransactionsList';
import { ConnectedTagsList } from '../Tag';
import { mergeTransactionLists } from '../TransactionsList/TransactionsListUtils';
import { mergeTransactions } from '../TransactionsList/TransactionsListActions';
import { parseCSVLine } from '../../utils/TransactionParser';

import './NewEntry.css';
import '../css/button.css';

function updateTransactions(transactions, payload) {
  return transactions.map((t) => {
    if (t.id === payload.id) {
      return Object.assign({}, t, payload.values, { id: t.id });    
    } else {
      return t;
    }
  });
}

const ENTER_KEY_CODE = 13;

class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      transactions: []
    };

    this.updateTransaction = this.updateTransaction.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSave = this.onSave.bind(this);
    this.validate = this.validate.bind(this);
  }
  
  updateTransaction(payload) {
    const transactions = updateTransactions(this.state.transactions, payload)
    this.setState( { transactions });
  }

  validate() {
    if (this.textInput.value) {
      const raw = this.textInput.value
        .split('\n')
        .map(line => parseCSVLine(line))
        .filter(t => t);
      const transactions = mergeTransactionLists(raw, []);

      this.setState({
        value: '',
        transactions
      });
    }
  }

  onCancel(event) {
    this.setState({
      value: '',
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
      value: '',
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
        </div>
      );
    } else {
      return (
        <div>
          <div className="transactionslistview">
            <TransactionsTable
              tags={this.props.tags}
              transactions={this.state.transactions}
              updateTransaction={this.updateTransaction}
            />
            <ConnectedTagsList />
          </div>
          <div className="button-group">
            <button
              className="button-warning button"
              onClick={this.onCancel}
            >
              Cancel
            </button>
            <button
              className="button-success button"
              onClick={this.onSave}
            >
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    mergeTransactions: arr => dispatch(mergeTransactions(arr))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);