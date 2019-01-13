import React from "react";

import "./AccountsSelector.css";

const AccountsSelector = props => {
  const { accounts, selectAccount } = props;

  console.log(props);
  return (
    <div className="account-selector">
      {accounts.map(acc => (
        <span key={acc.id}>
          <input
            type="checkbox"
            name="checkbox"
            id={acc.id}
            value="value"
            onChange={() => selectAccount(acc.id)}
            checked={acc.selected}
          />
          <label htmlFor={acc.id}>{acc.name}</label>
        </span>
      ))}
    </div>
  );
};

AccountsSelector.defaultProps = {
  accounts: []
};

export default AccountsSelector;
