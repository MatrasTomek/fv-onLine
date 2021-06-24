import { SET_TEST_BASE, REMOVE_TEST_BASE } from "../actions";

const testBase = false;

export const testBaseChange = (state = testBase, action) => {
  switch (action.type) {
    case SET_TEST_BASE:
      return (state = action.testBase);
    case REMOVE_TEST_BASE:
      return (state = testBase);

    default:
      console.warn(`Nie ma akcji typu ${action.type}`);
      return state;
  }
};
