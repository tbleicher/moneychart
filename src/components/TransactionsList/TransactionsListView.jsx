import React from 'react';

import TransactionsTable from './TransactionsTableConnected';
import { ConnectedTagsList } from '../Tag';

import './TransactionsListView.css';

class TransactionsListView extends React.Component {

  render() {
    return (
      <section className="views">
        {/* <ListButtons /> */}
        <h2>Transaction List</h2>
        <div className="transactionslistview">
          <TransactionsTable />
          <ConnectedTagsList title='Category Filter' />
        </div>
      </section>
    );
  }
}

export default TransactionsListView;
