import { useState } from "react";
import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { getAllClients, editClient } from "../../../data/actions/clientActions";
import Modal from "../../Modal";
import { Button } from "../../Buttons";
import clientRequest from "../../../helpers/clientRequest";
import styles from "./addClientForm.module.scss";

const required = (value) => (value ? undefined : "Pole wymagane");

const AddClientForm = ({ isModalOpen, setIsModalOpen, client = "" }) => {
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
    if (!client) {
      const clientObject = {
        companyName: values.companyName,
        companyAdress: values.companyAdress,
        vatNo: values.vatNo,
        eMail: values.eMail,
        info: !values.info ? "" : values.info,
      };
      const { data, status } = await clientRequest.post(
        "/clients",
        clientObject
      );
      if (status === 201) {
        handleOnClose();
        resetStateOfInput();
        dispatch(getAllClients([data.data]));

        // setShowSpinner(false);
        // props.setTaskInformation("Dodano klienta");
      } else if (status === 409) {
        // setShowSpinner(false);
        setValidateMessage(data.message);
      } else {
        // setShowSpinner(false);
        console.log(data.message);
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

      const { data, status } = await clientRequest.put(
        "/clients",
        clientObject
      );
      if (status === 202) {
        handleOnClose();
        dispatch(editClient(data.data));
      } else {
        console.log(data.message, status);
      }
    }
  };

  const clientExist = validateMessage.length ? (
    <h2>{validateMessage}</h2>
  ) : null;

  return (
    <Modal handleOnCloseModal={handleOnClose} isModalOpen={isModalOpen}>
      <div className={styles.wrapper}>
        <h3>
          {!client
            ? "Dodawanie nowego kontrahenta"
            : `Edycja kontrahenta: ${companyName}`}
        </h3>
        <div className={styles.validateMessage}>{clientExist}</div>
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
      {/* <div className={styles.spinnerWrapper}>{spinner}</div> */}
    </Modal>
  );
};

export default AddClientForm;
