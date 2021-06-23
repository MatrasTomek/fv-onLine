import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSpinner, removeSpinner } from "../../data/actions";
import request from "../../helpers//request";
import styles from "./settlementItem.module.scss";

const SettlementItem = ({ item }) => {
  const dispatch = useDispatch();
  console.log(item);
  //set invoice payment isDone
  const [flagIsPaid, setFlagIsPaid] = useState(item.invoice.isPaid);

  const handleChangeStatus = async () => {
    setFlagIsPaid(!flagIsPaid);
    dispatch(addSpinner());
    const invoice = {
      additionalDescription: item.invoice.additionalDescription,
      additionalInfo: item.invoice.additionalInfo,
      currency: item.invoice.currency,
      dateOfExchange: item.invoice.dateOfExchange,
      dateOfIssue: item.invoice.dateOfIssue,
      dateOfPayment: item.invoice.dateOfPayment,
      dateOfSales: item.invoice.dateOfSales,
      description: item.invoice.description,
      isPaid: !flagIsPaid,
      netPrice: item.invoice.netPrice,
      quantity: item.invoice.quantity,
      vat: item.invoice.vat,
    };

    const invoiceObj = {
      id: item._id,
      invoiceNo: item.invoiceNo,
      exchange: item.exchange,
      invoice: invoice,
      client: item.client,
    };
    const { data, status } = await request.put("/invoice", invoiceObj);
    if (status === 202) {
      dispatch(removeSpinner());
      console.log(data.data);
      // dispatch(getAllInvoices([data.data]));
    } else {
      dispatch(removeSpinner());
      console.log(data.message);
    }
  };

  const netValue =
    Number(item.invoice.netPrice) * Number(item.invoice.quantity);
  const grossValue = (netValue * Number(item.invoice.vat)) / 1000 + netValue;

  return (
    <div className={styles.wrapper}>
      <p>
        Faktura nr: {""}
        {item.invoiceNo}
      </p>
      <p>
        data wystawienia: {""}
        {item.invoice.dateOfIssue}
      </p>
      <p>
        termin płatności: {""}
        {item.invoice.dateOfPayment}
      </p>
      <form>
        <label className={styles.container}>
          <input
            name="isPaid"
            type="checkbox"
            checked={flagIsPaid}
            onChange={handleChangeStatus}
          />
          <span className={styles.checkmark}></span>
          zapłacone
        </label>
      </form>
      <p>
        wartość netto: {""}
        {netValue}
        {item.invoice.currency}
      </p>
      <p>
        Vat: {""}
        {item.invoice.vat}%
      </p>
      <p>
        wartosć brutto: {""}
        {grossValue} {item.invoice.currency}
      </p>
    </div>
  );
};

export default SettlementItem;
