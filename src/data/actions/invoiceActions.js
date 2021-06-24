export const GET_ALL_INVOICES = "GET_ALL_INVOICES";
export const DELETE_INVOICE = "DELETE_INVOICE";
export const EDIT_INVOICE = "EDIT_INVOICE";
export const CLEAR_INVOICE = "CLEAR_INVOICE";

export const getAllInvoices = (data) => ({
  type: GET_ALL_INVOICES,
  payload: data,
});
export const editInvoice = (data) => ({
  type: EDIT_INVOICE,
  payload: data,
});

export const deleteInvoice = (id) => ({
  type: DELETE_INVOICE,
  payload: id,
});
export const clearInvoice = () => ({
  type: CLEAR_INVOICE,
});
