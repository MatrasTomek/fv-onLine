import { useSelector } from "react-redux";
import invoiceNumber from "../../../helpers/invoiceNumber";

import { Button, Modal } from "../../../components";
import styles from "./showInvoice.module.scss";

const ShowInvoice = ({ isModalOpen, setIsModalOpen }) => {
  const invoice = useSelector((store) => store.invoice);
  const clients = useSelector((store) => store.clients);
  const exchange = useSelector((store) => store.exchange);

  const { companyName, companyAdress, vatNo } = !clients[0] ? "" : clients[0];
  const {
    dateOfIssue,
    dateOfSales,
    dateOfPayment,
    description,
    additionalDescription,
    netPrice,
    currency,
    quantity,
    vat,
  } = !invoice[0] ? "" : invoice[0];

  const { effectiveDate, mid, no } = !exchange.length ? "" : exchange[0];

  const clientData = !clients.length ? (
    ""
  ) : (
    <div>
      <p>Nabywca:</p>
      <h4>{companyName}</h4>
      <p>{companyAdress}</p>
      <p>{vatNo}</p>
    </div>
  );

  const netValue = Number(netPrice) * Number(quantity);

  const vatValue = (netValue * Number(vat)) / 100;

  const grossValue = netValue + vatValue;

  const exchangeRate = netValue * mid;

  const discriptionTaxForCurr =
    currency === "PLN" ? (
      ""
    ) : (
      <p>
        Wartość netto w pln <span>{exchangeRate.toFixed(2)}</span>, wartosć
        podatku VAT w pln <span>{(vatValue * mid).toFixed(2)}</span> wg kursu
        Euro z dnia{" "}
        <span>
          {effectiveDate}, <span>{mid}pln</span>{" "}
        </span>
        , tabela: <span>{no}</span>
      </p>
    );

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveInvoice = () => {
    invoiceNumber(invoice[0].dateOfIssue.slice(5, 7));
  };

  return (
    <Modal isModalOpen={isModalOpen}>
      <div className={styles.wrapper}>
        <div className={styles.buyer}>{clientData}</div>
        <div className={styles.invoiceDetails}>
          <div className={styles.dates}>
            <div>
              <p>data wystawienia:</p>
              <p>{dateOfIssue}</p>
            </div>
            <div>
              <p>data sprzedaży:</p>
              <p>{dateOfSales}</p>
            </div>
            <div>
              <p>termin płatności:</p>
              <p>{dateOfPayment}</p>
            </div>
            <div>
              <p>Opis:</p>
              <p>{description}</p>
              <p>{additionalDescription}</p>
            </div>
          </div>
          <div className={styles.prices}>
            <div>
              <p>cena netto:</p>
              <p>{Number(netPrice).toFixed(2)}</p>
              <p>{currency}</p>
            </div>
            <div>
              <p>ilość:</p>
              <p>{quantity}</p>
            </div>
            <div>
              <p>wartość netto:</p>
              <p>{netValue.toFixed(2)}</p>
              <p>{currency}</p>
            </div>
          </div>
          <div className={styles.taxes}>
            <div>
              <p>stawka VAT:</p>
              <p>{vat}%</p>
            </div>
            <div>
              <p>wartość VAT:</p>
              <p>
                {vatValue.toFixed(2)} {currency}
              </p>
            </div>
            <div>
              <p>warość brutto: </p>
              <p>
                {grossValue.toFixed(2)} {currency}
              </p>
            </div>
          </div>
          <div className={styles.discribes}>{discriptionTaxForCurr}</div>
        </div>
        <div className={styles.buttons}>
          <Button name="wstecz" onClick={handleCloseModal} />
          <Button name="zapisz" onClick={handleSaveInvoice} />
        </div>
      </div>
    </Modal>
  );
};

export default ShowInvoice;
