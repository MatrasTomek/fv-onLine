import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addSpinner,
  clearInvoice,
  editDel,
  getAllInvoices,
  removeSpinner,
  timeoutShowTask,
} from "../../data/actions";
import request from "../../helpers/request";
import { Button, BackButton, InvoiceItem } from "../../components";
import styles from "./invoices.module.scss";

const Invoices = () => {
  const invoicesObj = useSelector((store) => store.invoicesObj);
  const dispatch = useDispatch();

  const [invoiceNo, setInvoiceNo] = useState(false);

  const handleSetInvoiceNo = (e) => {
    e.preventDefault();
    setInvoiceNo(e.target.value);
  };

  const handleSearchInvoice = async (e) => {
    e.preventDefault();
    dispatch(addSpinner());
    const { data, status } = await request.get(`/invoice/${invoiceNo}`);
    if (status === 200) {
      dispatch(removeSpinner());
      dispatch(getAllInvoices(data.data));
    } else {
      dispatch(removeSpinner());
      dispatch(timeoutShowTask(data.message));
    }
  };

  const handleGetAllInvoices = async () => {
    dispatch(addSpinner());
    const { data, status } = await request.get("/invoice");
    if (status === 200) {
      dispatch(removeSpinner());
      dispatch(getAllInvoices(data.data));
    } else {
      dispatch(removeSpinner());
      console.log(data.message);
    }
  };

  const invoivesViev =
    !invoicesObj.length || !invoicesObj[0]._id
      ? ""
      : invoicesObj.map((item) => (
          <InvoiceItem
            key={item._id}
            id={item._id}
            client={item.client}
            invoice={item.invoice}
            invoiceNo={item.invoiceNo}
            exchange={item.exchange}
          />
        ));

  const handleClearEdit = () => {
    dispatch(editDel());
    dispatch(clearInvoice());
  };

  return (
    <div className={styles.wrapper}>
      <h1>Moduł fakturowania</h1>
      <div className={styles.selectButttons}>
        <div className={styles.backButton}>
          <BackButton />
        </div>
        <Link to="/invoices/add">
          <Button name="dodaj fakture" onClick={handleClearEdit} />
        </Link>
        <form className={styles.form} onSubmit={handleSearchInvoice}>
          <input
            type="text"
            placeholder="podaj numer faktury"
            onChange={handleSetInvoiceNo}
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
        </form>

        <Button
          name={`${!invoicesObj.length ? "pobierz wszystko" : "odśwież"}`}
          onClick={handleGetAllInvoices}
        />
      </div>

      <div className={styles.invoicesList}>{invoivesViev}</div>
    </div>
  );
};
export default Invoices;
