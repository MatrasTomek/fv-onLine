import { LOGIN_POST, LOGIN_DEL } from "../actions";

const initialState = {
  isLogin: false,
};

export const loginReducer = (state = [initialState], action) => {
  switch (action.type) {
    case LOGIN_POST:
      return [{ isLogin: action.isLogin }];
    case LOGIN_DEL:
      return [{ isLogin: action.isLogin }];
    default:
      console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
