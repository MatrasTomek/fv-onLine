import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvoices, addSpinner, removeSpinner } from "../../data/actions";
import request from "../../helpers/request";
import { Button, BackButton, SearchModal, InvoiceItem } from "../../components";
import styles from "./invoices.module.scss";

const Invoices = () => {
  const invoicesObj = useSelector((store) => store.invoicesObj);

  const dispatch = useDispatch();

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

  const invoivesViev = !invoicesObj.length
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

  return (
    <div className={styles.wrapper}>
      <h1>Moduł fakturowania</h1>
      <div className={styles.selectButttons}>
        <div className={styles.backButton}>
          <BackButton />
        </div>
        <Link to="/invoices/add">
          <Button name="dodaj fakture" />
        </Link>

        <Button name="szukaj faktury" />
        <SearchModal />

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
