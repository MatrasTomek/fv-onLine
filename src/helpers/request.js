import axios from "axios";

export const request = axios.create({
	// baseURL: "https://invoice-nest.herokuapp.com/",
	baseURL: "http://localhost:8080",

	validateStatus: false,
});

export default request;
