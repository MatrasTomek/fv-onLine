import { combineReducers } from "redux";

import { loginReducer } from "./loginReducer";
import { cookieReducer } from "./cookieReducer";

export const rootReducer = combineReducers({
  login: loginReducer,
  cookie: cookieReducer,
});
