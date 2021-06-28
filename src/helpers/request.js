import axios from "axios";

const request = axios.create({
  baseURL: "https://invoice-on-line.herokuapp.com/",
  // baseURL: "http://localhost:8000",

  validateStatus: false,
});

export default request;
