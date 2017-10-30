import React from 'react';
import TransactionActions from '../actions/TransactionActions';

import './NewEntry.css';
import '../css/button.css';

const ENTER_KEY_CODE = 13;

const NewEntry = React.createClass({

  getInitialState: function () {
    return {
      value: this.props.value || ''
    };
  },

  _save: function () {
    TransactionActions.create(this.state.value);
    this.setState({
      value: ''
    });
  },

  _onChange: function (event) {
    this.setState({
      value: event.target.value
    });
  },

  _onKeyDown: function (event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  },

  render: function () {
    return (
      <textarea className='newentry'
        rows={5}
        id='newentry'
        placeholder='paste csv lines here'
        onBlur={this._save}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={this.state.value} />
    );
  }
});

module.exports = NewEntry;
