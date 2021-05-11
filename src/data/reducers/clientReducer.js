import {
  GET_ALL_CLIENTS,
  GET_ONE_CLIENT,
  ADD_CLIENT,
  DELETE_CLIENT,
  EDIT_CLIENT,
} from "../actions";

export const clientReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_CLIENTS:
      return [action.payload];

    default:
      console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
