//import shortid from 'shortid';

import { ADD_ACCOUNT, SELECT_ACCOUNT } from './AccountActionTypes';

const AccountsListReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ACCOUNT:
      return state
        .map(account => Object.assign({}, account, { selected: false }))
        .concat([Object.assign({}, action.payload, { seelcted: true })]);

    case SELECT_ACCOUNT:
      return state.map(account => {
        if (account.id === action.payload) {
          return Object.assign({}, account, { selected: true });
        } else if (account.selected) {
          return Object.assign({}, account, { selected: false });
        } else {
          return account;
        }
      });

    default:
      return state;
  }
};

export default AccountsListReducer;
