import request from "./request";

const invoiceNumber = async (issueMonth) => {
  const month = issueMonth;
  let number;
  let _id;

  let newInvoiceNumber = {};

  const setNumber = async () => {
    const { data, status } = await request.put("/invoiceNumber", {
      month,
      number,
      _id,
    });
    if (status === 202) {
      return (newInvoiceNumber = {
        month: data.data.month,
        number: data.data.number,
      });
    } else {
      console.log(data.message);
    }
  };

  const setNewMonth = async () => {
    const { data, status } = await request.post("/invoiceNumber", {
      month,
      number,
    });
    if (status === 201) {
      return (newInvoiceNumber = {
        month: data.data.month,
        number: data.data.number,
      });
    } else {
      console.log(data.message);
    }
  };

  const { data, status } = await request.get("/invoiceNumber");
  if (status === 200) {
    const isMonthSet = data.data.find((item) => item.month === month);
    if (isMonthSet) {
      _id = isMonthSet._id;
      number = isMonthSet.number + 1;
      return setNumber();
    } else if (!isMonthSet) {
      number = 1;
      return setNewMonth();
    }
  } else {
    console.log(data.message);
  }

  return newInvoiceNumber;
};

export default invoiceNumber;
