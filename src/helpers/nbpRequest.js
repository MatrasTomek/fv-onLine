import axios from "axios";

const nbpRequest = axios.create({
  baseURL: "http://api.nbp.pl/api/exchangerates/rates/A/",
  method: "HEAD",
  mode: "no-cors",
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  credentials: "same-origin",
  crossdomain: true,
});

export default nbpRequest;
