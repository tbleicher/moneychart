import React from 'react';

import Button from './Button';
import ConditionalButton from './ConditionalButton';
import TransactionStore from '../stores/TransactionStore';
import TransactionActions from '../actions/TransactionActions';

import './ListButtons.css';

function deselectAll() {
  console.log('deselect all clicked');
  TransactionActions.deselectAll();
}

function removeAll() {
  console.warn('remove all clicked');
  TransactionActions.removeAll();
}

export default class ListButtons extends React.Component {
  render() {
    const selectedCount = TransactionStore.getSelectedCount();

    return (
      <div className='listbuttons'>
      <Button label='remove all' onClick={removeAll} />
      | selected: {selectedCount} |
      <ConditionalButton onClick={deselectAll} count={selectedCount} />
      </div>
    );
  }
}

