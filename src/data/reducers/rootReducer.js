import { combineReducers } from "redux";

import { loginReducer } from "./loginReducer";
import { cookieReducer } from "./cookieReducer";
import { clientReducer } from "./clientReducer";
import { spinnerReducer } from "./spinnerReducer";
import { taskReducer } from "./taskReducer";

export const rootReducer = combineReducers({
  login: loginReducer,
  cookie: cookieReducer,
  clients: clientReducer,
  spinner: spinnerReducer,
  task: taskReducer,
});
