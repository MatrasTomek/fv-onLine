export const SET_TEST_BASE = "SET_TEST_BASE";
export const REMOVE_TEST_BASE = "REMOVE_TEST_BASE";

export const setTestBase = () => ({
  type: SET_TEST_BASE,
  testBase: true,
});
export const removeTestBase = () => ({
  type: REMOVE_TEST_BASE,
});
