export const ADD_DEALER = "ADD_DEALER";
export const REMOVE_DEALER = "REMOVE_DEALER";

export const addDealer = (data) => ({
  type: ADD_DEALER,
  payload: data,
});

export const removeDealer = () => ({
  type: REMOVE_DEALER,
});
