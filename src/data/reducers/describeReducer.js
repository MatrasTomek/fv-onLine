import { GET_DESCRIBE, DELETE_DESCRIBE, EDIT_DESCRIBE } from "../actions";

export const describeReducer = (state = [], action) => {
  switch (action.type) {
    case GET_DESCRIBE:
      return (state = action.payload);

    // case EDIT_CLIENT:
    //   return state.map((item) => {
    //     if (item._id !== action.payload._id) {
    //       return item;
    //     }
    //     const { companyAdress, companyName, vatNo, eMail, info } =
    //       action.payload;
    //     return {
    //       companyAdress,
    //       companyName,
    //       vatNo,
    //       eMail,
    //       info,
    //       _id: item._id,
    //     };
    //   });
    // case DELETE_CLIENT:
    //   return state.filter((item) => item._id !== action.payload);

    default:
      console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
