import { combineReducers } from "redux";

import { loginReducer } from "./loginReducer";
import { cookieReducer } from "./cookieReducer";
import { clientReducer } from "./clientReducer";
import { spinnerReducer } from "./spinnerReducer";
import { taskReducer } from "./taskReducer";
import { describeReducer } from "./describeReducer";
import { invoiceReducer } from "./invoiceReducer";
import { exchangeReducer } from "./exchangeReducer";
import { invoiceNumberReducer } from "./invoiceNumberReducer";
import { editReducer } from "./editReducer";
import { testBaseChange } from "./testBaseReducer";
import { dataFromOrder } from "./dataFromOrderReducer";

export const rootReducer = combineReducers({
  login: loginReducer,
  cookie: cookieReducer,
  clients: clientReducer,
  spinner: spinnerReducer,
  task: taskReducer,
  description: describeReducer,
  invoicesObj: invoiceReducer,
  exchange: exchangeReducer,
  invoiceNumber: invoiceNumberReducer,
  isEdit: editReducer,
  testBase: testBaseChange,
  dataFromOrder: dataFromOrder,
});
