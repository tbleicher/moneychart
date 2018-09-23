import {
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  LOAD_ACCOUNTS,
  SELECT_ACCOUNT,
  UPDATE_ACCOUNT
} from "./AccountActionTypes";

import * as api from "./api";

export const addAccount = account => {
  return dispatch => {
    api.addAccount(account).then(data => {
      if (data.error) {
        console.error(data.error);
      } else {
        dispatch({
          type: ADD_ACCOUNT,
          payload: { ...account, ...data }
        });
      }
    });
  };
};

export const deleteAccount = id => {
  return dispatch => {
    api.deleteAccount(id).then(data => {
      if (data.error) {
        console.error(data.error);
      } else {
        dispatch({
          type: DELETE_ACCOUNT,
          payload: id
        });
      }
    });
  };
};

export const loadAccounts = () => {
  return function(dispatch) {
    api.loadAccounts().then(data => {
      if (data.error) {
        console.error(data.error);
      } else {
        dispatch({
          type: LOAD_ACCOUNTS,
          payload: data.map(d => ({ ...d, transactions: [] }))
        });
      }
    });
  };
};

export const selectAccount = id => {
  return dispatch => {
    api.loadAccount(id).then(account => {
      const tags = [
        { color: "#faa", id: 1, label: "red" },
        { color: "#afa", id: 1, label: "green" },
        { color: "#aff", id: 1, label: "green::sub" }
      ];

      dispatch({
        type: UPDATE_ACCOUNT,
        payload: { ...account, tags }
      });

      dispatch({
        type: SELECT_ACCOUNT,
        payload: id
      });
    });
  };
};
