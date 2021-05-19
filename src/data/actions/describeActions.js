export const GET_DESCRIBE = "GET_DESCRIBE";
export const ADD_DESCRIBE = "ADD_DESCRIBE";

export const getDescribe = (data) => ({
  type: GET_DESCRIBE,
  payload: data,
});

export const addDescribe = (data) => ({
  type: ADD_DESCRIBE,
  payload: data,
});

// export const deleteClient = (id) => ({
//   type: DELETE_CLIENT,
//   payload: id,
// });
