import { COOKIE_SET, COOKIE_DELETE } from "../actions";

export const cookieReducer = (state = [], action) => {
  switch (action.type) {
    case COOKIE_SET:
      return [...state, action.payload];
    case COOKIE_DELETE:
      return [...state, action.payload];
    default:
      console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
