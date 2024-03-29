import { useState } from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllClients,
  editClient,
  addSpinner,
  removeSpinner,
  timeoutShowTask,
  addDealer,
} from "../../../data/actions";
import clientRequest from "../../../helpers/clientRequest";

import { Button, Modal } from "../../../components";
import styles from "./addClientForm.module.scss";

const required = (value) => (value ? undefined : "Pole wymagane");

const AddClientForm = ({
  isModalOpen,
  setIsModalOpen,
  client = "",
  dealer = false,
}) => {
  const testBase = useSelector((store) => store.testBase);

  const dispatch = useDispatch();

  const { companyAdress, companyName, eMail, vatNo, _id, info } = client;
  const [validateMessage, setValidateMessage] = useState("");

  const handleOnClose = () => {
    setIsModalOpen(false);
  };

  const resetStateOfInput = () => {
    setValidateMessage("");
  };
  const onSubmit = async (values) => {
    dispatch(addSpinner());

    if (!client) {
      const clientObject = {
        companyName: values.companyName,
        companyAdress: values.companyAdress,
        vatNo: values.vatNo,
        eMail: values.eMail,
        info: !values.info ? "" : values.info,
        accountNo: !values.accountNo ? "" : values.accountNo,
        swiftIban: !values.swiftIban ? "" : values.swiftIban,
        bankName: !values.bankName ? "" : values.bankName,
      };
      if (testBase) {
        if (dealer === "dealer") {
          localStorage.setItem("dealer", JSON.stringify(clientObject));
          handleOnClose();
          resetStateOfInput();
          dispatch(addDealer([clientObject]));
          dispatch(removeSpinner());
          setIsModalOpen(false);
          dispatch(timeoutShowTask("Sprzedawca dodany"));
        } else {
          localStorage.setItem("client", JSON.stringify(clientObject));
          handleOnClose();
          resetStateOfInput();
          dispatch(getAllClients([clientObject]));
          dispatch(removeSpinner());
          setIsModalOpen(false);
          dispatch(timeoutShowTask("Klient dodany"));
        }
      } else {
        const { data, status } = await clientRequest.post(
          "/clients",
          clientObject
        );
        if (status === 201) {
          handleOnClose();
          resetStateOfInput();
          dispatch(getAllClients([data.data]));
          dispatch(removeSpinner());
          setIsModalOpen(false);
          dispatch(timeoutShowTask("Klient dodany"));
        } else if (status === 409) {
          dispatch(removeSpinner());
          setValidateMessage(data.message);
        } else {
          dispatch(removeSpinner());
          console.log(data.message);
        }
      }
    } else if (client) {
      const clientObject = {
        clientId: _id,
        companyName: !values.companyName ? companyName : values.companyName,
        companyAdress: !values.companyAdress
          ? companyAdress
          : values.companyAdress,
        vatNo: !values.vatNo ? vatNo : values.vatNo,
        eMail: !values.eMail ? eMail : values.eMail,
        info: !values.info ? info : values.info,
      };

      if (testBase) {
        const clientObjectLocal = {
          companyName: !values.companyName ? companyName : values.companyName,
          companyAdress: !values.companyAdress
            ? companyAdress
            : values.companyAdress,
          vatNo: !values.vatNo ? vatNo : values.vatNo,
          eMail: !values.eMail ? eMail : values.eMail,
          info: !values.info ? info : values.info,
        };
        localStorage.setItem("client", JSON.stringify(clientObjectLocal));
        handleOnClose();
        resetStateOfInput();
        dispatch(getAllClients([clientObjectLocal]));
        dispatch(removeSpinner());
        setIsModalOpen(false);
        dispatch(timeoutShowTask("Dane klienta zmienione"));
      } else {
        const { data, status } = await clientRequest.put(
          "/clients",
          clientObject
        );
        if (status === 202) {
          dispatch(editClient(data.data));
          setIsModalOpen(false);
          dispatch(removeSpinner());
          dispatch(timeoutShowTask("Dane klienta zmienione"));
        } else {
          console.log(data.message, status);
          dispatch(removeSpinner());
        }
      }
    }
  };

  const clientExist = validateMessage.length ? (
    <p className={styles.validateMessage}>{validateMessage}</p>
  ) : null;

  return (
    <Modal isModalOpen={isModalOpen}>
      <div className={styles.wrapper}>
        <h3>
          {!client
            ? !dealer
              ? "Dodawanie nowego kontrahenta"
              : "Dodawanie sprzedawcy"
            : `Edycja kontrahenta: ${companyName}`}
        </h3>
        <div>{clientExist}</div>
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
              <div className={styles.inputs}>
                <Field name="companyName" validate={!client ? required : false}>
                  {({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="text"
                        placeholder={
                          !client ? "Nazwa Firmy..." : `${client.companyName}`
                        }
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field
                  name="companyAdress"
                  validate={!client ? required : false}
                >
                  {({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="text"
                        placeholder={
                          !client ? "Adres Firmy..." : `${client.companyAdress}`
                        }
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="vatNo" validate={!client ? required : false}>
                  {({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="text"
                        placeholder={!client ? "Numer Nip" : `${client.vatNo}`}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="eMail" validate={!client ? required : false}>
                  {({ input, meta }) => (
                    <div className={styles.name}>
                      <input
                        {...input}
                        type="text"
                        placeholder={!client ? "eMail" : `${client.eMail}`}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <div className={styles.notes}>
                  <Field
                    name="info"
                    component="textarea"
                    placeholder={!client ? "info" : `${client.info}`}
                  />
                </div>
                {!dealer ? (
                  ""
                ) : (
                  <Field name="accountNo">
                    {({ input, meta }) => (
                      <div className={styles.name}>
                        <input
                          {...input}
                          type="number"
                          placeholder="numer konta"
                        />
                      </div>
                    )}
                  </Field>
                )}
                {!dealer ? (
                  ""
                ) : (
                  <Field name="bankName">
                    {({ input, meta }) => (
                      <div className={styles.name}>
                        <input
                          {...input}
                          type="text"
                          placeholder="Nazwa banku"
                        />
                      </div>
                    )}
                  </Field>
                )}
                {!dealer ? (
                  ""
                ) : (
                  <Field name="swiftIban">
                    {({ input, meta }) => (
                      <div className={styles.name}>
                        <input
                          {...input}
                          type="text"
                          placeholder="SWIFT / IBAN"
                        />
                      </div>
                    )}
                  </Field>
                )}
              </div>
              <div className={styles.buttons}>
                <Button type="submit" disabled={submitting} name="zapisz" />
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                  className={styles.resetButton}
                >
                  reset
                </button>
                <Button type="button" onClick={handleOnClose} name="wyjdź" />
              </div>
            </form>
          )}
        />
      </div>
    </Modal>
  );
};

export default AddClientForm;
