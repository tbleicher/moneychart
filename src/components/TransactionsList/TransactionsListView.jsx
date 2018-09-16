import React from "react";

import Section from "../Section";
import TransactionsTable from "./TransactionsTableConnected";
import { TagsList } from "../Tag";

import "./TransactionsListView.css";

class TransactionsListView extends React.Component {
  render() {
    return (
      <Section title="Transactions">
        <div className="transactionslistview">
          <TransactionsTable />
          <TagsList title="Category Filter" />
        </div>
      </Section>
    );
  }
}

export default TransactionsListView;
