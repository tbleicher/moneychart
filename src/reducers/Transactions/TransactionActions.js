import {
  ADD_TRANSACTION,
  MERGE_TRANSACTIONS,
  REMOVE_TRANSACTION,
  SELECT_TRANSACTION,
  SET_TRANSACTIONS,
  UPDATE_TRANSACTION
} from "./TransactionActionTypes";

import * as api from "./api";

export const createTransaction = (accountId, data) => {
  return dispatch => {
    api.createTransaction(accountId, data).then(transaction => {
      dispatch(addTransaction(transaction));
    });
  };
};

export const addTransaction = transaction => {
  return {
    type: ADD_TRANSACTION,
    payload: transaction
  };
};

export const mergeTransactions = arr => {
  return {
    type: MERGE_TRANSACTIONS,
    payload: arr
  };
};

export const removeTransaction = id => {
  return {
    type: REMOVE_TRANSACTION,
    payload: id
  };
};

export const selectTransaction = id => {
  return {
    type: SELECT_TRANSACTION,
    payload: id
  };
};

export const setTransactions = transactions => {
  return {
    type: SET_TRANSACTIONS,
    payload: transactions
  };
};

export const updateTransaction = data => {
  return {
    type: UPDATE_TRANSACTION,
    payload: data
  };
};
