export const ADD_SPINNER = "ADD_SPINNER";
export const REMOVE_SPINNER = "REMOVE_SPINNER";

export const addSpinner = () => ({
  type: ADD_SPINNER,
  spinnerActive: true,
});
export const removeSpinner = () => ({
  type: REMOVE_SPINNER,
  spinnerActive: false,
});
