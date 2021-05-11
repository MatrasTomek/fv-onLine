import { COOKIE_SET, COOKIE_DELETE } from "../actions";

const initialState = {
  isCookie: false,
};

export const cookieReducer = (state = [initialState], action) => {
  switch (action.type) {
    case COOKIE_SET:
      return [{ isCookie: action.isCookie }];
    case COOKIE_DELETE:
      return [{ isCookie: action.isCookie }];
    default:
      console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
