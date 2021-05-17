export const OPEN_TASK = "OPEN_TASK";
export const CLOSE_TASK = "CLOSE_TASK";

export const timeoutShowTask = (task) => (dispatch) => {
  dispatch({
    type: OPEN_TASK,
    isModalOpen: true,
    task,
  });
  setTimeout(
    () =>
      dispatch({
        type: CLOSE_TASK,
        isModalOpen: false,
      }),
    2500
  );
};
