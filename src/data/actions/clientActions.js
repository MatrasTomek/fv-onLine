export const GET_ALL_CLIENTS = "GET_ALL_CLIENTS";
export const DELETE_CLIENT = "DELETE_CLIENT";
export const EDIT_CLIENT = "EDIT_CLIENT";
export const CLEAR_CLEINT_STATE = "CLEAR_CLEINT_STATE";

export const getAllClients = (data) => ({
  type: GET_ALL_CLIENTS,
  payload: data,
});
export const editClient = (data) => ({
  type: EDIT_CLIENT,
  payload: data,
});

export const deleteClient = (id) => ({
  type: DELETE_CLIENT,
  payload: id,
});

export const clearClentState = () => ({
  type: CLEAR_CLEINT_STATE,
});
