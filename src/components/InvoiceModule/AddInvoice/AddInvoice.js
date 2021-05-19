import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import {
  addSpinner,
  removeSpinner,
  timeoutShowTask,
  getDescribe,
} from "../../../data/actions";
import request from "../../../helpers/request";

import {
  AddClientForm,
  BackButton,
  Button,
  SearchModal,
  AddInfoForm,
} from "../../../components";
import styles from "./addInvoice.module.scss";

const AddInvoice = () => {
  const clients = useSelector((store) => store.clients[0]);
  const description = useSelector((store) => store.description);

  const dispatch = useDispatch();

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [addDescribeModalOpen, setAddDescribeModalOpen] = useState(false);
  const [dataFrom, setDataFrom] = useState(false);

  const handleFromModalOpen = () => {
    setFormModalOpen(true);
  };
  const handleSearchModalOpen = () => {
    setSearchModalOpen(true);
  };

  const handleOpenAddDescribction = (e) => {
    e.preventDefault();
    setAddDescribeModalOpen(true);
    setDataFrom(e.target.id);
  };

  const decsriptionOptions = description.map((item) => (
    <option key={item._id} value={item.describeName}>
      {item.describeName}
    </option>
  ));

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Dodawanie nowej Faktury</h1>
      <form>
        <Button type="submit" name="pobierz dane ze zlecenia" />
        <input type="text" placeholder="podaj numer zlecenia" />
      </form>
      <p>Faktura numer:</p>
      <div className={styles.customer}>
        <h4>Nabywca:</h4>
        <div className={styles.clientItem}>
          <p>{!clients ? "" : clients.companyName}</p>
          <p>{!clients ? "" : clients.companyAdress}</p>
          <p>{!clients ? "" : clients.vatNo}</p>
        </div>
        <Button name="dodaj klienta" onClick={handleFromModalOpen} />
        <AddClientForm
          isModalOpen={formModalOpen}
          setIsModalOpen={setFormModalOpen}
        />
        <Button
          name={!clients ? "pobierz klienta" : "zmień klienta"}
          onClick={handleSearchModalOpen}
        />
        <SearchModal
          isModalOpen={searchModalOpen}
          setIsModalOpen={setSearchModalOpen}
        />
      </div>
      <div className={styles.order}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form
              className={styles.form}
              onSubmit={(event) => {
                const promise = handleSubmit(event);
                promise &&
                  promise.then(() => {
                    form.reset();
                  });
                return promise;
              }}
            >
              <div className={styles.dates}>
                <div>
                  <p>data wystawienia</p>
                  <Field name="dateOfIssue" type="date" component="input" />
                </div>
                <div>
                  <p>data sprzedaży</p>
                  <Field name="dateOfSales" type="date" component="input" />
                </div>
                <div>
                  <p>termin płatności</p>
                  <Field name="dateOfPayment" type="date" component="input" />
                </div>
              </div>
              <div className={styles.info}>
                <p>usługa / towar</p>
                <Field name="description" component="select">
                  <option value="" />
                  {decsriptionOptions}
                </Field>
                <Button
                  type="button"
                  name="dodaj"
                  id="description"
                  onClick={handleOpenAddDescribction}
                />
                <p>dodatkowy opis</p>
                <Field name="additionalDescription" component="input"></Field>
              </div>
              <div className={styles.conditions}>
                <div>
                  <p>cena netto</p>
                  <Field name="netPrice" type="number" component="input" />
                </div>
                <div>
                  <p>waluta</p>
                  <Field name="currency" component="select">
                    <option value="" />
                    <option value="PLN">PLN</option>
                    <option value="EUR">EUR</option>
                  </Field>
                </div>
                <div>
                  <p>vat</p>
                  <Field name="vat" component="select">
                    <option value="" />
                    <option value="0">0%</option>
                    <option value="8">8%</option>
                    <option value="23">23%</option>
                    <option value="none">zwolniony</option>
                  </Field>
                </div>

                <div>
                  <p>ilość</p>
                  <Field name="quantity" type="number" component="input" />
                </div>
              </div>
              <div className={styles.addInfo}>
                <p>Informacje dodatkowe</p>
                <Field name="additionalInfo" component="input"></Field>
              </div>
              <div className={styles.buttons}>
                <Button type="submit" disabled={submitting} name="podgląd" />
              </div>
            </form>
          )}
        />
      </div>

      <div className={styles.buttons}>
        <BackButton />
      </div>
      <AddInfoForm
        isModalOpen={addDescribeModalOpen}
        setIsModalOpen={setAddDescribeModalOpen}
        dataFrom={dataFrom}
      />
    </div>
  );
};

export default AddInvoice;
