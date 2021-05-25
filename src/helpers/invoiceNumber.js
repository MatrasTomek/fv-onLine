import request from "./request";

const invoiceNumber = (issueMonth) => {
  const month = issueMonth;
  let number;
  let _id;

  const newInvoiceNumber = {
    month: "",
    number: 0,
  };

  const setNumber = async () => {
    const { data, status } = await request.put("/invoiceNumber", {
      month,
      number,
      _id,
    });
    if (status === 202) {
      newInvoiceNumber.month = data.data.month;
      newInvoiceNumber.number = data.data.number;
      console.log(data);
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
      newInvoiceNumber.month = data.data.month;
      newInvoiceNumber.number = data.data.number;
      console.log(data);
    } else {
      console.log(data.message);
    }
  };

  const getNumber = async () => {
    const { data, status } = await request.get("/invoiceNumber");
    if (status === 200) {
      const isMonthSet = data.data.find((item) => item.month === month);
      if (isMonthSet) {
        _id = isMonthSet._id;
        number = isMonthSet.number + 1;
        setNumber();
      } else if (!isMonthSet) {
        number = 1;
        setNewMonth();
      }
    } else {
      console.log(data.message);
    }
  };
  getNumber();
  return (
    <>
      <p>
        {newInvoiceNumber.number} / {newInvoiceNumber.month}
      </p>
    </>
  );
};

export default invoiceNumber;
