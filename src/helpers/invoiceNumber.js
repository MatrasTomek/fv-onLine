import request from "./request";

const invoiceNumber = async (issueMonth) => {
	const month = issueMonth;
	let number;
	let _id;
	let newInvoiceNo = {};

	const setNumber = async () => {
		const { data } = await request.put("/invoice-number", {
			month,
			number,
			_id,
		});

		if (data.isSucces === true) {
			return;
		} else {
			return console.log(data.info);
		}
	};

	const { data } = await request.get("/invoice-number");
	if (data) {
		if (Number(data.data[0].month) === Number(month)) {
			number = data.data[0].number + 1;
			_id = data.data[0]._id;
			setNumber();
			return (newInvoiceNo = {
				month: month,
				number: number,
			});
		} else {
			number = 1;
			_id = data.data[0]._id;
			setNumber();
			return (newInvoiceNo = {
				month: month,
				number: number,
			});
		}
	} else {
		return console.log(data.info);
	}
};

export default invoiceNumber;
