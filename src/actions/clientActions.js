export const GET_ALL_CLIENTS = "GET_ALL_CLIENTS";
export const GET_ONE_CLIENT = "GET_ONE_CLIENT";
export const ADD_CLIENT = "ADD_CLIENT";
export const DELETE_CLIENT = "DELETE_CLIENT";
export const EDIT_CLIENT = "EDIT_CLIENT";

const getAllClients = ({ name, adress, vat, id }) => ({
  type: GET_ALL_CLIENTS,
});

const deleteClient = (id) => ({
  type: DELETE_CLIENT,
  payload: {
    id,
  },
});
