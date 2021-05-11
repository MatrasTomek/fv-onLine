export const GET_ALL_CLIENTS = "GET_ALL_CLIENTS";
export const GET_ONE_CLIENT = "GET_ONE_CLIENT";
export const ADD_CLIENT = "ADD_CLIENT";
export const DELETE_CLIENT = "DELETE_CLIENT";
export const EDIT_CLIENT = "EDIT_CLIENT";

// companyAdress,
// companyName,
// eMail,
// vatNo,
// _id,
// info,

export const getAllClients = (data) => ({
  type: GET_ALL_CLIENTS,
  payload: data,
});

const deleteClient = (id) => ({
  type: DELETE_CLIENT,
  payload: {
    id,
  },
});
