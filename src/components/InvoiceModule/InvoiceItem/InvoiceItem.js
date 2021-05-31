import { useState } from "react";

import { AddClientForm, Button, DeleteConfirmation } from "../../../components";
import { MONTHS_INFO } from "../../../helpers/monthsInfo";
import { ClientItem } from "../../ClientModule";
import styles from "./invoiceItem.module.scss";

const InvoiceItem = ({ id, client, invoice, invoiceNo, exchange }) => {
  const { companyAdress, companyName, vatNo } = client;
  const { effectiveDate, mid, no } = exchange;
  const {
    additionalDescription,
    additionalInfo,
    currency,
    dateOfExchange,
    dateOfIssue,
    dateOfPayment,
    dateOfSales,
    description,
    netPrice,
    quantity,
    vat,
  } = invoice;
  const { month, number } = invoiceNo;

  const netValue = Number(netPrice) * quantity;
  const vatValue = (netValue * vat) / 1000;
  const grossValue = netValue + vatValue;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails((prev) => !prev);
  };

  const showExchangeInfo =
    currency === "PLN" ? (
      ""
    ) : (
      <div className={styles.exchangeInfo}>
        <p>
          Wartość netto w pln <span>{(netValue * mid).toFixed(2)}</span>,
          wartosć podatku VAT w pln <span>{(vatValue * mid).toFixed(2)}</span>{" "}
          wg kursu Euro z dnia{" "}
          <span>
            {effectiveDate}, <span>{mid}pln</span>{" "}
          </span>
          , tabela: <span>{no}</span>
        </p>
      </div>
    );

  const showAdditionalInfo = !showDetails ? (
    ""
  ) : (
    <div className={styles.additionalInfo}>
      <div>
        <p>data wystawienia</p>
        <p>{dateOfIssue}</p>
      </div>
      <div>
        <p>data sprzedaży</p>
        <p>{dateOfSales}</p>
      </div>
      <div>
        <p>cena netto</p>
        <p>
          {Number(netPrice).toFixed(2)} {currency}
        </p>
      </div>
      <div>
        <p>iość</p>
        <p>{quantity}</p>
      </div>
      <div>
        <p>wartosć netto</p>
        <p>
          {netValue.toFixed(2)} {currency}
        </p>
      </div>
      <div>
        <p>stawka vat</p>
        <p>{vat} %</p>
      </div>
      <div>
        <p>wartość vat</p>
        <p>
          {vatValue.toFixed(2)} {currency}
        </p>
      </div>
      <div>
        <p>Opis:</p>
        <p>{description}</p>
        <p>{additionalDescription}</p>
        <p>{additionalInfo}</p>
      </div>
      {showExchangeInfo}
    </div>
  );

  const handleOnEdit = async () => {
    setIsModalOpen(true);
  };

  const handleDeleteConfirmation = () => {
    setIsConfirmationOpen(true);
  };
  const date = new Date();
  const year = date.getFullYear();
  const invoiceNumber = `${number}/${MONTHS_INFO[Number(month) - 1]}/${year}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.invoiceNo}>
        <p>Faktura numer:</p>
        <p>{invoiceNumber}</p>
      </div>
      <div className={styles.client}>
        <p>Nabywca:</p>
        <p>{companyName}</p>
        <p>{companyAdress}</p>
        <p>{vatNo}</p>
      </div>
      <div className={styles.basicInfo}>
        <div>
          <p>termin płatności:</p>
          <p>{dateOfPayment}</p>
        </div>
        <div>
          <p>kwota brutto</p>
          <p>
            {grossValue.toFixed(2)} {currency}
          </p>
        </div>
      </div>
      {showAdditionalInfo}

      <div className={styles.buttons}>
        <Button
          name={!showDetails ? "szczegóły" : "ukryj"}
          onClick={handleShowDetails}
        />
        <Button name="edytuj" onClick={handleOnEdit} />
        <Button name="usuń" onClick={handleDeleteConfirmation} />
      </div>

      <DeleteConfirmation
        isModalOpen={isConfirmationOpen}
        setIsModalOpen={setIsConfirmationOpen}
        id={id}
      />
    </div>
  );
};

export default InvoiceItem;
