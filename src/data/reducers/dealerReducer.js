import { ADD_DEALER, REMOVE_DEALER } from "../actions";

export const dealerReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_DEALER:
      return (state = action.payload);

    case REMOVE_DEALER:
      return (state = []);

    default:
      // console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
