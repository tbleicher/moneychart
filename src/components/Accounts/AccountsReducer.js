//import shortid from 'shortid';

import {
  ADD_ACCOUNT,
  LOAD_ACCOUNTS,
  SELECT_ACCOUNT
} from "./AccountActionTypes";

const AccountsListReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ACCOUNT:
      return state
        .map(account => ({ ...account, selected: false }))
        .concat([{ ...action.payload, selected: true }]);

    case LOAD_ACCOUNTS:
      return [...action.payload];

    case SELECT_ACCOUNT:
      return state.map(account => {
        if (account.id === action.payload) {
          return { ...account, selected: true };
        } else if (account.selected) {
          return { ...account, selected: false };
        } else {
          return account;
        }
      });

    default:
      return state;
  }
};

export default AccountsListReducer;
