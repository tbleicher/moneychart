//import shortid from 'shortid';

import {
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  LOAD_ACCOUNTS,
  SELECT_ACCOUNT,
  UPDATE_ACCOUNT
} from "./AccountActionTypes";

const mergeAccountsList = (state, update) => {
  const sIds = state.map(account => account.id);
  const uIds = update.map(account => account.id);

  const unique = Array.from(new Set([...sIds, ...uIds]).values());

  const newState = unique.map(id => {
    const sAcc = state.find(acc => acc.id === id) || {};
    const uAcc = update.find(acc => acc.id === id) || {};

    return { ...sAcc, ...uAcc };
  });

  return newState;
};

const AccountsListReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ACCOUNT:
      return state
        .map(account => ({ ...account, selected: false }))
        .concat([{ ...action.payload, selected: true }]);

    case DELETE_ACCOUNT:
      return state.filter(account => account.id !== action.payload);

    case LOAD_ACCOUNTS:
      return mergeAccountsList(state, action.payload);

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
