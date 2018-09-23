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
      console.log("trans:", transaction);
      dispatch(addTransaction(transaction));
    });
  };
};

export function addTransaction(transaction) {
  return {
    type: ADD_TRANSACTION,
    payload: transaction
  };
}

export function mergeTransactions(arr) {
  return {
    type: MERGE_TRANSACTIONS,
    payload: arr
  };
}

export function removeTransaction(id) {
  return {
    type: REMOVE_TRANSACTION,
    payload: id
  };
}

export function selectTransaction(id) {
  return {
    type: SELECT_TRANSACTION,
    payload: id
  };
}

export const setTransactions = transactions => {
  console.log("ta.setTransactions", transactions.length);

  return {
    type: SET_TRANSACTIONS,
    payload: transactions
  };
};

export function updateTransaction(t) {
  return {
    type: UPDATE_TRANSACTION,
    payload: t
  };
}
