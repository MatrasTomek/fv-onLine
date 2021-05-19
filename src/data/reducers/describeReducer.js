import { GET_DESCRIBE, ADD_DESCRIBE } from "../actions";

export const describeReducer = (state = [], action) => {
  switch (action.type) {
    case GET_DESCRIBE:
      return action.payload;

    case ADD_DESCRIBE:
      return state.push(action.payload);

    default:
      console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
