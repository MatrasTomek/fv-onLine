import {
  GET_ALL_INVOICES,
  DELETE_INVOICE,
  EDIT_INVOICE,
  CLEAR_INVOICE,
} from "../actions";

const initialState = [];

export const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_INVOICES:
      return (state = action.payload);
    case EDIT_INVOICE:
      return state.map((item) => {
        if (item._id !== action.payload._id) {
          return item;
        }
        const {
          dateOfIssue,
          dateOfPayment,
          dateOfSales,
          kindOfPayment,
          description,
          additionalDescription,
          netPrice,
          currency,
          vat,
          quantity,
          additionalInfo,
        } = action.payload;
        return {
          dateOfIssue,
          dateOfPayment,
          dateOfSales,
          kindOfPayment,
          description,
          additionalDescription,
          netPrice,
          currency,
          vat,
          quantity,
          additionalInfo,
          _id: item._id,
        };
      });
    case DELETE_INVOICE:
      return state.filter((item) => item._id !== action.payload);
    case CLEAR_INVOICE:
      return initialState;
    default:
      // console.warn(`Nie ma akcji typu ${action.type}`);

      return state;
  }
};
