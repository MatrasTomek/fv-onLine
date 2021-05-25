export const GET_EXCHANGE = "GET_EXCHANGE";
export const ADD_DESCRIBE = "ADD_DESCRIBE";

export const getExchange = (data) => ({
  type: GET_EXCHANGE,
  payload: data,
});
