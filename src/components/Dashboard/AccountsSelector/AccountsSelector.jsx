import React from "react";

import "./AccountsSelector.css";

const AccountsSelector = props => {
  const { accounts, updateAccount } = props;

  return (
    <div className="account-selector">
      {accounts.map(acc => (
        <span key={acc.id}>
          <input
            type="checkbox"
            name={acc.id}
            id={acc.id}
            value="value"
            onChange={() =>
              updateAccount({ id: acc.id, display: !acc.display })
            }
            checked={acc.display}
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
