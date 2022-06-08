import axios from "axios";

const omegaRequest = axios.create({
  baseURL: "  https://omega-invoice.herokuapp.com/",

  validateStatus: false,
});

export default omegaRequest;
