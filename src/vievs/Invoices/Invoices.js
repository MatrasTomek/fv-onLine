import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addDealer,
  addSpinner,
  clearClentState,
  clearInvoice,
  editDel,
  getAllClients,
  getAllInvoices,
  orderDataDel,
  orderDataSet,
  removeSpinner,
  timeoutShowTask,
} from "../../data/actions";
import request from "../../helpers/request";
import clientRequest from "../../helpers/clientRequest";
import { Button, BackButton, InvoiceItem } from "../../components";
import styles from "./invoices.module.scss";

const Invoices = () => {
  const invoicesObj = useSelector((store) => store.invoicesObj);
  const testBase = useSelector((store) => store.testBase);
  const dispatch = useDispatch();
  const history = useHistory();
  // Set data from order (DB for OrderOnLine)
  const [orderNumber, setOrderNumber] = useState("");

  const handleSetOrderNumber = (e) => {
    e.preventDefault();
    setOrderNumber(e.target.value);
  };

  const handleGetOrderData = async (e) => {
    e.preventDefault();
    dispatch(addSpinner());
    const { data, status } = await clientRequest.get(`/orders/${orderNumber}`);
    if (status === 200) {
      const invoiceData = [
        {
          additionalDescription: `Trasa: ${data.data[0].orderLoadCity} - ${data.data[0].orderUnloadCity}`,
          currency: data.data[0].orderClientCurr,
          dateOfSales: data.data[0].orderUnloadDate,
          netPrice: data.data[0].orderClientPrice,
          quantity: "1",
        },
      ];
      const client = {
        companyAdress: data.data[0].clientAdress,
        companyName: data.data[0].clientName,
        vatNo: data.data[0].clientVatNo,
      };
      dispatch(editDel());
      dispatch(getAllClients([client]));
      dispatch(orderDataSet(invoiceData));
      history.push("/invoices/add");
      dispatch(removeSpinner());
    } else {
      dispatch(timeoutShowTask(data.message));
      dispatch(removeSpinner());
    }
  };

  const getOdrerDataViev = (
    <form className={styles.orderData} onSubmit={handleGetOrderData}>
      <input
        type="text"
        placeholder="pobierz dane ze zlecenie numer:"
        value={orderNumber}
        onChange={handleSetOrderNumber}
        disabled={!testBase ? false : true}
      />
      <button
        className={styles.downloadButton}
        type="submit"
        disabled={!testBase ? false : true}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
        </svg>
      </button>
      <div className={styles.info}>
        <p>ta opcja działa z modułem zleceń: zlecenia onLine</p>
      </div>
    </form>
  );

  //Serch Invoice
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
      dispatch(timeoutShowTask("Nie ma faktury o podanym numerze."));
    }
  };

  // Geat all Invoices from DB or refresh DB
  const handleGetAllInvoices = async () => {
    dispatch(addSpinner());
    if (testBase) {
      if (localStorage.getItem("invoice") === null) {
        dispatch(timeoutShowTask("w Twojej bazei nie ma żadnych faktur"));
        dispatch(removeSpinner());
      } else {
        const retrievedObject = JSON.parse(localStorage.getItem("invoice"));
        const dealerObject = JSON.parse(localStorage.getItem("dealer"));
        dispatch(getAllInvoices([retrievedObject]));
        dispatch(addDealer([dealerObject]));
        dispatch(removeSpinner());
      }
    } else {
      const { data, status } = await request.get("/invoice");
      if (status === 200) {
        dispatch(removeSpinner());
        dispatch(getAllInvoices(data.data));
      } else {
        dispatch(removeSpinner());
        console.log(data.message);
      }
    }
  };

  // Invoices viev
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

  // Open Add new Invoice page
  const handleClearEdit = () => {
    dispatch(editDel());
    dispatch(clearClentState());
    dispatch(clearInvoice());
    dispatch(orderDataDel());
  };

  return (
    <div className={styles.wrapper}>
      <h1>Moduł fakturowania</h1>
      <div className={styles.selectButttons}>
        <div className={styles.backButton}>
          <BackButton />
        </div>
        {getOdrerDataViev}
        <Link to="/invoices/add">
          <Button name="dodaj nową fakture" onClick={handleClearEdit} />
        </Link>
        <form className={styles.form} onSubmit={handleSearchInvoice}>
          <input
            type="text"
            placeholder="szukaj FV po numerze:"
            onChange={handleSetInvoiceNo}
            disabled={!testBase ? false : true}
          />
          <button type="submit" disabled={!testBase ? false : true}>
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
          <div className={styles.info}>
            <p>opcja dostępna po zalogowaniu</p>
          </div>
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
