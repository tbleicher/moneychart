//import shortid from 'shortid';

import {
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  LOAD_ACCOUNTS,
  SELECT_ACCOUNT,
  UPDATE_ACCOUNT
} from "./AccountActionTypes";

const AccountsListReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ACCOUNT:
      return state
        .map(account => ({ ...account, selected: false }))
        .concat([{ ...action.payload, selected: true }]);

    case DELETE_ACCOUNT:
      return state.filter(account => account.id !== action.payload);

    case LOAD_ACCOUNTS:
      return [...action.payload];

    case SELECT_ACCOUNT:
      console.log("SELECT_ACCOUNT", action);
      return state.map(account => {
        if (account.id === action.payload) {
          return { ...account, selected: true };
        } else if (account.selected) {
          return { ...account, selected: false };
        } else {
          return account;
        }
      });

    case UPDATE_ACCOUNT:
      console.log("UPDATE_ACCOUNT", action);
      return state.map(account => {
        if (account.id === action.payload.id) {
          return { ...account, ...action.payload };
        } else {
          return account;
        }
      });

    default:
      return state;
  }
};

export default AccountsListReducer;
