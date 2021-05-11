import axios from "axios";

const clientRequest = axios.create({
  baseURL: "https://order-on-line.herokuapp.com/",

  validateStatus: false,
});

export default clientRequest;
