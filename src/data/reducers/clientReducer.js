import {
  GET_ALL_CLIENTS,
  EDIT_CLIENT,
  DELETE_CLIENT,
  CLEAR_CLEINT_STATE,
} from "../actions";

export const clientReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_CLIENTS:
      return (state = action.payload);
    case EDIT_CLIENT:
      return state.map((item) => {
        if (item._id !== action.payload._id) {
          return item;
        }
        const { companyAdress, companyName, vatNo, eMail, info } =
          action.payload;
        return {
          companyAdress,
          companyName,
          vatNo,
          eMail,
          info,
          _id: item._id,
        };
      });
    case DELETE_CLIENT:
      return state.filter((item) => item._id !== action.payload);
    case CLEAR_CLEINT_STATE:
      return (state = []);

    default:
      console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
