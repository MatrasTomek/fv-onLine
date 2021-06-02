export const EDIT_SET = "EDIT_SET";
export const EDIT_DELETE = "EDIT_DELETE";

export const editSet = (data) => ({
  type: EDIT_SET,
  isEdit: true,
  payload: data,
});

export const editDel = () => ({
  type: EDIT_DELETE,
  isEdit: false,
});
