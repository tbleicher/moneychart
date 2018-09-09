import React from "react";

import Account from "./ConnectedAccount";
import DemoAccount from "./DemoAccount";
import NewAccount from "./NewAccount";

import "./Account.css";

class AccountsView extends React.Component {
  componentDidMount() {
    this.props.loadAccounts();
  }

  render() {
    const accounts = this.props.accounts.length
      ? this.props.accounts.map(account => (
          <Account
            key={account.number}
            {...account}
            select={() => this.props.selectAccount(account.id)}
          />
        ))
      : <DemoAccount />;

    return (
      <section className="views">
        {/* <ListButtons /> */}
        <h2>Accounts</h2>

        <div className="accountsview">
          {accounts}
          <NewAccount />
        </div>
      </section>
    );
  }
}

export default AccountsView;
