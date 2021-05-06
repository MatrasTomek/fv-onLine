import { LOGIN_POST } from "../actions";

const loginReducer = (state = [], action) => {
  switch (action.type) {
    case LOGIN_POST:
      return [...state, action.payload];

    default:
      console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
