import { Link } from "react-router-dom";

import { Button, BackButton, SearchModal } from "../../components";
import styles from "./invoices.module.scss";

const Invoices = () => {
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

        <Button name="pobierz wszystko" />
      </div>

      <div className={styles.invoicesList}>widok FV</div>
    </div>
  );
};
export default Invoices;
