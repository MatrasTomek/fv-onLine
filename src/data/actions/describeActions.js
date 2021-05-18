export const GET_DESCRIBE = "GET_DESCRIBE";
export const DELETE_DESCRIBE = "DELETE_DESCRIBE";
export const EDIT_DESCRIBE = "EDIT_DESCRIBE";

export const getDescribe = (data) => ({
  type: GET_DESCRIBE,
  payload: data,
});

// export const editClient = (data) => ({
//   type: EDIT_CLIENT,
//   payload: data,
// });

// export const deleteClient = (id) => ({
//   type: DELETE_CLIENT,
//   payload: id,
// });
