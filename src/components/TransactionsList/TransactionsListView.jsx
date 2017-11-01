import React from 'react';

import Section from '../Section';
import TransactionsTable from './TransactionsTableConnected';
import { ConnectedTagsList } from '../Tag';

import './TransactionsListView.css';

class TransactionsListView extends React.Component {

  render() {
    return (
      <Section title="Transactions">
        <div className="transactionslistview">
          <TransactionsTable />
          <ConnectedTagsList title='Category Filter' />
        </div>
      </Section>
    );
  }
}

export default TransactionsListView;
