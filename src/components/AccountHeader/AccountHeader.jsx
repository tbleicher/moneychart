import React from "react";

const AccountHeader = props => {
  const { account } = props;

  if (!account) return null;

  return (
    <div className="header account" style={{ backgroundColor: "#ff0" }}>
      <div className="name">
        {account.name}
      </div>
      <div>
        {account.number}
      </div>
      <div>{account.format || "[format]"}</div>
    </div>
  );
};

export default AccountHeader;
