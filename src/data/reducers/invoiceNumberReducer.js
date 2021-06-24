import { SET_NUMBER } from "../actions";

export const invoiceNumberReducer = (state = [], action) => {
  switch (action.type) {
    case SET_NUMBER:
      return (state = action.payload);

    // case ADD_DESCRIBE:
    //   return [...state, action.payload];

    default:
      // console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
