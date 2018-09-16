import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import accounts from "./reducers/Accounts";
import { TransactionsListReducer as transactions } from "./components/TransactionsList";
import tags from "./reducers/Tags";

export default combineReducers({
  accounts,
  routing: routerReducer,
  transactions,
  tags
});
