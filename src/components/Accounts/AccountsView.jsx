import React from "react";

import Account from "./AccountContainer";
import DemoAccount from "./DemoAccount";
import NewAccount from "./NewAccount";

import "./Account.css";

class AccountsView extends React.Component {
  static defaultProps = {
    accounts: []
  };

  componentDidMount() {
    console.log("did mount => loadAccounts()");
    this.props.loadAccounts();
  }

  render() {
    const { accounts } = this.props;

    const panels = accounts.map(account => (
      <Account
        key={account.id}
        {...account}
        deleteAccount={() => this.props.deleteAccount(account.id)}
        loadAccount={() => this.props.loadAccount(account.id)}
        selectAccount={() => this.props.selectAccount(account.id)}
      />
    ));

    const demoAccount = accounts.length ? null : <DemoAccount />;

    return (
      <section className="views">
        {/* <ListButtons /> */}
        <h2>Accounts</h2>

        <div className="accountsview">
          {panels}
          {demoAccount}
          <NewAccount />
        </div>
      </section>
    );
  }
}

export default AccountsView;
