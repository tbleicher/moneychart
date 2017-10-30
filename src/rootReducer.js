import { combineReducers } from 'redux';

import { AccountsReducer as accounts } from './components/Accounts';
import { TransactionsListReducer as transactions } from './components/TransactionsList';
import { TagsListReducer as tags } from './components/Tag';

export default combineReducers({
  accounts,
  transactions,
  tags
})
