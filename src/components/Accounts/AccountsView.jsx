import React from "react";

import Account from "./ConnectedAccount";
import DemoAccount from "./DemoAccount";
import NewAccount from "./NewAccount";

import "./Account.css";

class AccountsView extends React.Component {
  render() {
    const accounts = this.props.accounts.length ? (
      this.props.accounts.map(a => (
        <Account
          name={a.name}
          key={a.number}
          type={a.type}
          number={a.number}
          selected={a.selected}
          fromDate={a.fromDate}
          toDate={a.toDate}
          updatedDate={a.updatedDate}
        />
      ))
    ) : (
      <DemoAccount />
    );

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
