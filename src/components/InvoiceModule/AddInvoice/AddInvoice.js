import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import {
  addSpinner,
  removeSpinner,
  getAllInvoices,
  timeoutShowTask,
  getExchange,
  getDescribe,
} from "../../../data/actions";
import request from "../../../helpers/request";

import {
  AddClientForm,
  AddInfoForm,
  BackButton,
  Button,
  ShowInvoice,
  SearchModal,
} from "../../../components";
import styles from "./addInvoice.module.scss";

const required = (value) => (value ? undefined : "Pole wymagane");

const AddInvoice = () => {
  const clients = useSelector((store) => store.clients);
  const description = useSelector((store) => store.description);
  const invoice = useSelector((store) => store.invoice);

  const dispatch = useDispatch();
  const history = useHistory();

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [addDescribeModalOpen, setAddDescribeModalOpen] = useState(false);
  const [checkModalOpen, setCheckModalOpen] = useState(false);
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

  const handleRefreshDescribction = async (event) => {
    event.preventDefault();
    dispatch(addSpinner());

    const { data, status } = await request.get("/describe");
    if (status === 200) {
      dispatch(getDescribe(data.data));

      dispatch(removeSpinner());
    } else {
      dispatch(removeSpinner());
      console.log(data.message);
    }
  };

  const decsriptionOptions = !description.length
    ? ""
    : description.map((item) => (
        <option key={item._id} value={item.describeName}>
          {item.describeName}
        </option>
      ));

  const onSubmit = (values) => {
    dispatch(addSpinner());
    if (!clients.length) {
      dispatch(timeoutShowTask(`dodaj nabywcę`));
      dispatch(removeSpinner());
      return;
    }
    const invoiceArray = [];
    const invoiceObject = {
      dateOfIssue: values.dateOfIssue,
      dateOfSales: values.dateOfSales,
      dateOfPayment: values.dateOfPayment,
      description: values.description,
      additionalDescription: !values.additionalDescription
        ? ""
        : values.additionalDescription,
      netPrice: values.netPrice,
      currency: values.currency,
      dateOfExchange: values.dateOfExchange,
      vat: values.vat,
      quantity: values.quantity,
      additionalInfo: !values.additionalInfo ? "" : values.additionalInfo,
    };
    invoiceArray.push(invoiceObject);

    if (values.currency === "PLN") {
      dispatch(getAllInvoices(invoiceArray));
      dispatch(removeSpinner());
      setCheckModalOpen(true);
    } else {
      const url = `http://api.nbp.pl/api/exchangerates/rates/A/EUR/${values.dateOfExchange}`;
      fetch(url)
        .then((res) => {
          if (res.status !== 200) {
            return { status: "404" };
          } else return res.json();
        })
        .then((json) => {
          if (json.status === "404") {
            dispatch(removeSpinner());
            dispatch(timeoutShowTask(`nie ma kursu waluty w podanej dacie`));
          } else {
            dispatch(getAllInvoices(invoiceArray));
            dispatch(getExchange(json.rates));
            dispatch(removeSpinner());
            setCheckModalOpen(true);
          }
        })

        .catch(function (e) {
          console.log(e);
          dispatch(removeSpinner());
          dispatch(timeoutShowTask(`podaj datę kursu Euro`));
        });
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Dodawanie nowej Faktury</h1>

      <form className={styles.orderData}>
        <input type="text" placeholder="podaj numer zlecenia" />
        <Button type="submit" name="pobierz dane ze zlecenia" />
      </form>

      <div className={styles.customer}>
        <h4>Nabywca:</h4>
        <div className={styles.clientItem}>
          <p>{!clients.length ? "" : clients[0].companyName}</p>
          <p>{!clients.length ? "" : clients[0].companyAdress}</p>
          <p>{!clients.length ? "" : clients[0].vatNo}</p>
        </div>
        <div className={styles.buttons}>
          <Button name="dodaj klienta" onClick={handleFromModalOpen} />
          <Button
            name={!clients.length ? "pobierz klienta" : "zmień klienta"}
            onClick={handleSearchModalOpen}
          />
        </div>
        <AddClientForm
          isModalOpen={formModalOpen}
          setIsModalOpen={setFormModalOpen}
        />
        <SearchModal
          isModalOpen={searchModalOpen}
          setIsModalOpen={setSearchModalOpen}
        />
      </div>
      <div className={styles.invoice}>
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
                <Field name="dateOfIssue" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <label> data wystawienia</label>
                      <input type="date" {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="dateOfSales" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <label> data sprzedaży</label>
                      <input type="date" {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="dateOfPayment" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <label>termin płatności</label>
                      <input type="date" {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className={styles.info}>
                <Field name="description" component="select">
                  <option value={null}>wybierz usługę</option>
                  {decsriptionOptions}
                </Field>

                <div className={styles.buttons}>
                  <Button
                    type="button"
                    name="dodaj usułgę"
                    id="description"
                    onClick={handleOpenAddDescribction}
                  />
                  <Button
                    type="button"
                    name="odśwież listę"
                    id="description"
                    onClick={handleRefreshDescribction}
                  />
                </div>
                <Field name="additionalDescription">
                  {({ input }) => (
                    <div>
                      <label>dodatkowy opis</label>
                      <input type="text" {...input} />
                    </div>
                  )}
                </Field>
              </div>
              <div className={styles.conditions}>
                <Field name="netPrice" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <label>cena netto</label>
                      <input type="number" {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="quantity" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <label>ilość</label>
                      <input type="number" {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="currency" component="select">
                  <option value={false}>wybierz walutę</option>
                  <option value="PLN">PLN</option>
                  <option value="EUR">EUR</option>
                </Field>

                <Field name="dateOfExchange">
                  {({ input }) => (
                    <div>
                      <label>data kursu waluty</label>
                      <input type="date" {...input} />
                    </div>
                  )}
                </Field>

                <Field name="vat" component="select">
                  <option value={false}>wybierz stawkę VAT</option>
                  <option value="0">0%</option>
                  <option value="8">8%</option>
                  <option value="23">23%</option>
                  <option value={null}>zwolniony</option>
                </Field>
              </div>
              <div className={styles.addInfo}>
                <Field name="additionalInfo">
                  {({ input }) => (
                    <div>
                      <label>Informacje dodatkowe</label>
                      <input type="text" {...input} />
                    </div>
                  )}
                </Field>
              </div>
              <div className={styles.operationButtons}>
                <BackButton />
                <Button type="submit" disabled={submitting} name="podgląd" />
              </div>
            </form>
          )}
        />
      </div>

      <AddInfoForm
        isModalOpen={addDescribeModalOpen}
        setIsModalOpen={setAddDescribeModalOpen}
        dataFrom={dataFrom}
      />
      <ShowInvoice
        isModalOpen={checkModalOpen}
        setIsModalOpen={setCheckModalOpen}
      />
    </div>
  );
};

export default AddInvoice;
