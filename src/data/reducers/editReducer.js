import { EDIT_SET, EDIT_DELETE } from "../actions";

const initialState = {
  isEdit: false,
  data: [],
};

export const editReducer = (state = [initialState], action) => {
  switch (action.type) {
    case EDIT_SET:
      return [{ isEdit: action.isEdit, data: action.payload }];
    case EDIT_DELETE:
      return [{ isEdit: action.isEdit, data: [] }];
    default:
      console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
