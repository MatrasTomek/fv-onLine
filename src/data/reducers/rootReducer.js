import { combineReducers } from "redux";

import { loginReducer } from "./loginReducer";
import { cookieReducer } from "./cookieReducer";
import { clientReducer } from "./clientReducer";

export const rootReducer = combineReducers({
  login: loginReducer,
  cookie: cookieReducer,
  clients: clientReducer,
});
