import {
  ADD_TRANSACTION,
  MERGE_TRANSACTIONS,
  REMOVE_TRANSACTION,
  UPDATE_TRANSACTION,
  SELECT_TRANSACTION,
  SET_TRANSACTIONS
} from "./TransactionActionTypes";

import { mergeTransactionLists } from "./utils";

const transactionsList = (state = [], action) => {
  if (!action) return state;

  switch (action.type) {
    case ADD_TRANSACTION:
      return [...state, action.payload];

    case MERGE_TRANSACTIONS:
      return mergeTransactionLists(state, action.payload);

    case REMOVE_TRANSACTION:
      return state.filter(t => t.id !== action.payload);

    case SET_TRANSACTIONS:
      return action.payload.slice();

    case SELECT_TRANSACTION:
      return state.map(t => {
        if (t.id === action.payload) {
          return { ...t, selected: true };
        } else if (t.selected) {
          return { ...t, selected: false };
        } else {
          return t;
        }
      });

    case UPDATE_TRANSACTION:
      return state.map(t => {
        return t.id === action.payload.id ? { ...t, ...action.payload } : t;
      });

    default:
      return state;
  }
};

export default transactionsList;
