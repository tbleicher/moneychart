import {
  ADD_TRANSACTION,
  MERGE_TRANSACTIONS,
  REMOVE_TRANSACTION,
  SELECT_TRANSACTION,
  UPDATE_TRANSACTION
} from "./TransactionActionTypes";

export function addTransaction(text) {
  return {
    type: ADD_TRANSACTION,
    payload: text
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

export function updateTransaction(t) {
  return {
    type: UPDATE_TRANSACTION,
    payload: t
  };
}
