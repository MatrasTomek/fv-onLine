import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Button, Modal } from "../../../components";
import styles from "./printInvoice.module.scss";

const PrintInvoice = ({ isModalOpen, setIsModalOpen }) => {
  const invoicesObj = useSelector((store) => store.invoicesObj[0]);
  const { invoiceNo, client, invoice, exchange } = invoicesObj;
  const testBase = useSelector((store) => store.testBase);
  const componentRef = useRef();

  const [orgin, setOrgin] = useState("Oryginał");

  const { companyName, companyAdress, vatNo } = client;
  const {
    additionalDescription,
    additionalInfo,
    currency,
    dateOfIssue,
    dateOfPayment,
    dateOfSales,
    description,
    netPrice,
    quantity,
    vat,
  } = invoice;
  const { effectiveDate, mid, no } = !exchange.no === "0" ? "" : exchange;

  const netValue = Number(netPrice) * Number(quantity);
  const vatValue = (netValue * Number(vat)) / 100;
  const grossValue = netValue + vatValue;
  const exchangeRate = netValue * mid;
  const discriptionTaxForCurr =
    currency === "Pln" ? (
      ""
    ) : (
      <>
        <p>{additionalInfo}</p>
        <p>
          Wartość netto w pln <span>{exchangeRate.toFixed(2)}</span>, wartosć
          podatku VAT w pln <span>{(vatValue * mid).toFixed(2)}</span> wg kursu
          Euro z dnia{" "}
          <span>
            {effectiveDate}, <span>{mid}pln</span>{" "}
          </span>
          , tabela: <span>{no}</span>
        </p>
      </>
    );

  const changeKindOfInvoice = (e) => {
    setOrgin(e.target.value);
  };

  const handleOnPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "wydruk z programu Faktury onLine www.developerweb.pl",
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const seller = !testBase ? (
    <div>
      <p>Sprzedawca:</p>
      <h3>ND Tomasz Matras</h3>
      <p>32-800 Mokrzyska, Trakst Królewski 118</p>
      <p>Nip: PL8691491653</p>
    </div>
  ) : (
    <div>
      <p> Tu pojawi sie nazwa</p>
      <p>Twojej firmy...</p>
      <p>...wykup program</p>
      <a href="http://www.developerweb.pl/" target="blank">
        www.developerweb.pl
      </a>
    </div>
  );

  return (
    <Modal isModalOpen={isModalOpen}>
      <div className={styles.wrapper} ref={componentRef}>
        <div className={styles.sidesOfContract}>
          <div>
            <p>
              Faktura VAT nr: <span>{invoiceNo}</span>
              <span className={styles.invoiceKind}>{orgin}</span>
            </p>
            <form className={styles.invoiceSet}>
              <select name="kindOfInvoice" onChange={changeKindOfInvoice}>
                <option value="Oryginał">oryginał</option>
                <option value="Kopia">kopia</option>
                <option value="Duplikat">duplikat</option>
              </select>
            </form>
          </div>
          {seller}
          <div>
            <p>Nabywca:</p>
            <h3>{companyName}</h3>
            <p>{companyAdress}</p>
            <p>Nip: {vatNo}</p>
          </div>
        </div>
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
          <div className={styles.payInfo}>
            <h2>Do zapłaty:</h2>
            <h2>
              {grossValue.toFixed(2)} {currency}
            </h2>
          </div>
          <div className={styles.footer}>
            <div>
              <p>Wystawił:</p>
              {!testBase ? <p>Tomasz Matras</p> : <p>Rick&Morty</p>}
            </div>
            <p>
              Dziękujemy za skorzystanie z Naszych usług{" "}
              <span>www.developerweb.pl</span>
            </p>
          </div>
        </div>
        <div className={styles.buttons}>
          <Button type="button" name="wstecz" onClick={handleCloseModal} />
          <Button type="button" name="drukuj" onClick={handleOnPrint} />
        </div>
      </div>
    </Modal>
  );
};

export default PrintInvoice;
