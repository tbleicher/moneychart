import React from 'react';

import Section from '../Section';
import TransactionsTable from './TransactionsTableConnected';
import { ConnectedTagsList } from '../Tag';

import './TransactionsListView.css';

class TransactionsListView extends React.Component {

  render() {
    return (
      <Section title="Transactions">
        <div className="help">
          <p>This is an overview of the transactions in the account.
            Filtering and pagination is still missing - badly.</p>
          <p>You can drag tags from the list and drop it on a transaction
            when you can't define a suitable pattern (see 'Tags').</p>
        </div>
        <div className="transactionslistview">
          <TransactionsTable />
          <ConnectedTagsList title='Category Filter' />
        </div>
      </Section>
    );
  }
}

export default TransactionsListView;
