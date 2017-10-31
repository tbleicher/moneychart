import { 
  ADD_TRANSACTION,
  MERGE_TRANSACTIONS,
  REMOVE_TRANSACTION,
  UPDATE_TRANSACTION,
  SELECT_TRANSACTION,
  SET_TRANSACTIONS
} from './TransactionsListTypes';

import { parseCSVLine } from '../../utils/TransactionParser';
import { mergeTransactionLists } from './TransactionsListUtils';


const transactionsList = (state=[], action) => {
  switch (action.type) {
    
    case ADD_TRANSACTION:
      const transaction = parseCSVLine(action.payload);
      if (transaction) {
        return [...state, transaction];
      } else {
        return state;
      }

    case MERGE_TRANSACTIONS:
      return mergeTransactionLists(state, action.payload);

    case REMOVE_TRANSACTION:
      return state.filter(t => t.id !== action.payload);
    
    case SET_TRANSACTIONS:
      return action.payload.slice();

    case SELECT_TRANSACTION:
      return state.map((t) => {
        if (t.id === action.payload) {
          return Object.assign({}, t, { selected: true });
        } else if (t.selected) {
          return Object.assign({}, t, { selected: false });
        } else {
          return t;
        }
      });
    
    case UPDATE_TRANSACTION:
      return state.map((t) => {
        if (t.id === action.payload.id) {
          return Object.assign({}, t, action.payload.values, { id: t.id });    
        } else {
          return t;
        }
      });

    default:
      return state;
  }
}

export default transactionsList;
