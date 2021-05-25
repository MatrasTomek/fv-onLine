import { GET_EXCHANGE } from "../actions";

export const exchangeReducer = (state = [], action) => {
  switch (action.type) {
    case GET_EXCHANGE:
      return (state = action.payload);

    default:
      console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
