import axios from "axios";

const clientRequest = axios.create({
	// baseURL: "https://order-on-line.herokuapp.com/",
	baseURL: "https://ordersback.b4a.app",
	validateStatus: false,
});

export default clientRequest;
