import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import {
  addSpinner,
  removeSpinner,
  getAllClients,
  getAllInvoices,
  timeoutShowTask,
  getExchange,
  getDescribe,
  addDealer,
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
  const isEdit = useSelector((store) => store.isEdit[0].isEdit);
  const editData = useSelector((store) => store.isEdit[0].data[0]);
  const dataFromOrder = useSelector((store) => store.dataFromOrder[0].data[0]);
  const clientFromOrder = useSelector(
    (store) => store.dataFromOrder[0].data[1]
  );
  const testBase = useSelector((store) => store.testBase);
  const dealerData = useSelector((store) => store.dealerData);
  const dispatch = useDispatch();

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [addDescribeModalOpen, setAddDescribeModalOpen] = useState(false);
  const [checkModalOpen, setCheckModalOpen] = useState(false);
  const [dataFrom, setDataFrom] = useState(false);
  const [dealerModalOpen, setDealerModalOpen] = useState(false);
  const [addDealerId, setAddDealerId] = useState(false);

  const handleFromModalOpen = () => {
    setFormModalOpen(true);
  };

  const handleDealerModalOpen = (e) => {
    setDealerModalOpen(true);
    setAddDealerId(e.target.id);
  };
  const handleSearchModalOpen = () => {
    if (testBase) {
      if (localStorage.getItem("client") === null) {
        dispatch(timeoutShowTask("w Twojej bazei nie ma żadnych klientów"));
        dispatch(removeSpinner());
      } else {
        const retrievedObject = JSON.parse(localStorage.getItem("client"));
        dispatch(getAllClients([retrievedObject]));
        dispatch(removeSpinner());
      }
    } else {
      setSearchModalOpen(true);
    }
  };
  const dealerViev = () => {
    if (!dealerData.length) {
      return "";
    } else {
      return (
        <>
          <p>{dealerData[0].companyName}</p>
          <p>{dealerData[0].companyAdress}</p>
          <p>{dealerData[0].vatNo}</p>
        </>
      );
    }
  };

  const handleGetDealer = () => {
    const retrievedObject = JSON.parse(localStorage.getItem("dealer"));
    dispatch(addDealer([retrievedObject]));
  };

  const clientViev = () => {
    if (!clients.length) {
      return (
        <>
          <p>{!clientFromOrder ? "" : clientFromOrder.clientName}</p>
          <p>{!clientFromOrder ? "" : clientFromOrder.clientAdress}</p>
          <p>{!clientFromOrder ? "" : clientFromOrder.clientVatNo}</p>
        </>
      );
    } else
      return (
        <>
          <p>{clients[0].companyName}</p>
          <p>{clients[0].companyAdress}</p>
          <p>{clients[0].vatNo}</p>
        </>
      );
  };

  const handleOpenAddDescribction = (e) => {
    e.preventDefault();
    setAddDescribeModalOpen(true);
    setDataFrom(e.target.id);
  };

  useEffect(() => {
    handleRefreshDescribction();
  }, [!description.length]);

  const handleRefreshDescribction = async () => {
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
    if (!clients.length && !isEdit) {
      dispatch(timeoutShowTask(`Dodaj nabywcę`));
      dispatch(removeSpinner());
      return;
    }
    if (isEdit) {
      getAllClients(editData.client);
    }
    const invoiceArray = [];
    const invoiceObject = {
      dateOfIssue: values.dateOfIssue,
      dateOfSales: values.dateOfSales,
      dateOfPayment: values.dateOfPayment,
      kindOfPayment: values.kindOfPayment,
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
      isPaid: false,
    };
    invoiceArray.push(invoiceObject);

    if (values.currency === "Pln") {
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
            dispatch(timeoutShowTask(`Nie ma kursu waluty w podanej dacie`));
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
          dispatch(timeoutShowTask(`Podaj datę kursu Euro`));
        });
    }
  };

  const dealer = !testBase ? (
    ""
  ) : (
    <div className={styles.customer}>
      <h4>Sprzedawca:</h4>
      <div className={styles.clientItem}>{dealerViev()}</div>
      <div className={styles.buttons}>
        <Button
          name={!dealerData ? "dodaj sprzedawcę" : "zmień sprzedawcę"}
          id="dealer"
          onClick={handleDealerModalOpen}
        />
        <Button name="pobierz sprzedawcę" onClick={handleGetDealer} />
      </div>
      <AddClientForm
        isModalOpen={dealerModalOpen}
        setIsModalOpen={setDealerModalOpen}
        dealer={addDealerId}
      />
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <h1>
        {!isEdit
          ? "Dodawanie nowej Faktury"
          : `Edycja faktury ${editData.invoiceNo}`}
      </h1>
      {dealer}
      <div className={styles.customer}>
        <h4>Nabywca:</h4>
        <div className={styles.clientItem}>{clientViev()}</div>
        <div className={styles.buttons}>
          <Button name="dodaj klienta" onClick={handleFromModalOpen} />
          <Button
            name={
              !clients.length
                ? "pobierz klienta"
                : testBase
                ? "pobierz klienta"
                : "zmień klienta"
            }
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
                <Field
                  name="dateOfIssue"
                  validate={required}
                  initialValue={isEdit ? editData.invoice.dateOfIssue : null}
                >
                  {({ input, meta }) => (
                    <div>
                      <label> data wystawienia</label>
                      <input type="date" {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="dateOfSales"
                  validate={required}
                  initialValue={
                    isEdit
                      ? editData.invoice.dateOfSales
                      : !dataFromOrder
                      ? ""
                      : dataFromOrder.dateOfSales
                  }
                >
                  {({ input, meta }) => (
                    <div>
                      <label> data sprzedaży</label>
                      <input type="date" {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="dateOfPayment"
                  validate={required}
                  initialValue={isEdit ? editData.invoice.dateOfPayment : ""}
                >
                  {({ input, meta }) => (
                    <div>
                      <label>termin płatności</label>
                      <input type="date" {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>

                <Field
                  name="kindOfPayment"
                  component="select"
                  initialValue={
                    isEdit ? editData.invoice.kindOfPayment : "przelew"
                  }
                >
                  <option value="przelew">przelew</option>
                  <option value="płatność kartą">płatność kartą</option>
                  <option value="płatność gotówką">płatność gotówką</option>
                </Field>
              </div>

              <div className={styles.info}>
                <Field
                  name="description"
                  component="select"
                  initialValue={isEdit ? editData.invoice.description : ""}
                >
                  <option value={null}>wybierz usługę</option>
                  {decsriptionOptions}
                </Field>

                <div className={styles.buttons}>
                  <Button
                    type="button"
                    name="dodaj usułgę"
                    id="description"
                    onClick={handleOpenAddDescribction}
                    disabled={testBase ? true : false}
                  />
                  <div className={styles.infoDisabled}>
                    <p>opcja dostępna po zalogowaniu</p>
                  </div>
                </div>
                <Field
                  name="additionalDescription"
                  initialValue={
                    isEdit
                      ? editData.invoice.additionalDescription
                      : !dataFromOrder
                      ? ""
                      : dataFromOrder.additionalDescription
                  }
                >
                  {({ input }) => (
                    <div>
                      <label>dodatkowy opis</label>
                      <input type="text" {...input} />
                    </div>
                  )}
                </Field>
              </div>
              <div className={styles.conditions}>
                <Field
                  name="netPrice"
                  validate={required}
                  initialValue={
                    isEdit
                      ? editData.invoice.netPrice
                      : !dataFromOrder
                      ? ""
                      : dataFromOrder.netPrice
                  }
                >
                  {({ input, meta }) => (
                    <div>
                      <label>cena netto</label>
                      <input type="number" {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="quantity"
                  validate={required}
                  initialValue={
                    isEdit
                      ? editData.invoice.quantity
                      : !dataFromOrder
                      ? ""
                      : dataFromOrder.quantity
                  }
                >
                  {({ input, meta }) => (
                    <div>
                      <label>ilość</label>
                      <input type="number" {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="currency"
                  component="select"
                  initialValue={
                    isEdit
                      ? editData.invoice.currency
                      : !dataFromOrder
                      ? ""
                      : dataFromOrder.currency
                  }
                >
                  <option value={false}>wybierz walutę</option>
                  <option value="Pln">PLN</option>
                  <option value="Eur">EUR</option>
                </Field>

                <Field
                  name="dateOfExchange"
                  initialValue={isEdit ? editData.invoice.dateOfExchange : ""}
                >
                  {({ input }) => (
                    <div>
                      <label>data kursu waluty</label>
                      <input type="date" {...input} />
                    </div>
                  )}
                </Field>

                <Field
                  name="vat"
                  component="select"
                  initialValue={isEdit ? editData.invoice.vat : ""}
                >
                  <option value={false}>wybierz stawkę VAT</option>
                  <option value="0">0%</option>
                  <option value="8">8%</option>
                  <option value="23">23%</option>
                  <option value={null}>zwolniony</option>
                </Field>
              </div>
              <div className={styles.addInfo}>
                <Field
                  name="additionalInfo"
                  initialValue={isEdit ? editData.invoice.additionalInfo : ""}
                >
                  {({ input }) => (
                    <div>
                      <label>Informacje dodatkowe</label>
                      <input type="text" {...input} />
                    </div>
                  )}
                </Field>
              </div>
              <div className={styles.operationButtons}>
                <BackButton type="button" />
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
