export const GET_EXCHANGE = "GET_EXCHANGE";

export const getExchange = (data) => ({
	type: GET_EXCHANGE,
	payload: data,
});
