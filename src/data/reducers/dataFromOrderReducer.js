import { ORDER_DATA_SET, ORDER_DATA_DEL } from "../actions";

const initialState = {
  data: [],
};

export const dataFromOrder = (state = [initialState], action) => {
  switch (action.type) {
    case ORDER_DATA_SET:
      return (state = [{ data: action.payload }]);
    case ORDER_DATA_DEL:
      return (state = [initialState]);
    default:
      // console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
