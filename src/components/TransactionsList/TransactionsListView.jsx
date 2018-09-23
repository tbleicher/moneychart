import React from "react";

import Section from "../Section";
import TransactionsTable from "./TransactionsTableContainer";
import { TagsList } from "../Tag";

import "./TransactionsListView.css";
import TransactionInput from "./TransactionInput";

class TransactionsListView extends React.Component {
  render() {
    return (
      <Section title="Transactions">
        <div className="transactionslistview">
          <div style={{ marginRight: 30 }}>
            <TransactionsTable />
            <TransactionInput />
          </div>

          <TagsList title="Category Filter" />
        </div>
      </Section>
    );
  }
}

export default TransactionsListView;
