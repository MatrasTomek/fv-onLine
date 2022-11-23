import axios from "axios";

export const request = axios.create({
	baseURL: "https://invoiceback.b4a.app",
	// baseURL: "http://localhost:8080",

	validateStatus: false,
});

export default request;
