import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import accounts from "./reducers/Accounts";
import transactions from "./reducers/Transactions";
import tags from "./reducers/Tags";

export default combineReducers({
  accounts,
  routing: routerReducer,
  transactions,
  tags
});
