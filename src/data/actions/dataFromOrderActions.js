export const ORDER_DATA_SET = "ORDER_DATA_SET";
export const ORDER_DATA_DEL = "ORDER_DATA_DEL";

export const orderDataSet = (data) => ({
  type: ORDER_DATA_SET,
  payload: data,
});

export const orderDataDel = (data) => ({
  type: ORDER_DATA_DEL,
});
