import axios from "axios";

const request = axios.create({
  // baseURL: "https://order-on-line.herokuapp.com/",
  baseURL: "http://localhost:8000",

  validateStatus: false,
});

export default request;
