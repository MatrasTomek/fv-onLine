import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAllClients,
  addSpinner,
  removeSpinner,
} from "../../../data/actions";
import Modal from "../../Modal";
import { Button } from "../../Buttons";

import clientRequest from "../../../helpers/clientRequest";

import styles from "./searchModal.module.scss";

const SearchModal = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();

  const [vatNo, setVatNo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [validateMessage, setValidateMessage] = useState("");

  const handleOnChangeVat = (event) => setVatNo(event.target.value);
  const handleOnChangeName = (event) => setCompanyName(event.target.value);

  const handleOnCloseModal = (event) => {
    event.preventDefault();
    setIsModalOpen(false);
  };

  const resetStateOfInput = () => {
    setVatNo("");
    setCompanyName("");
    // setValidateMessage("");
  };

  // const spinner = showSpinner ? <Spinner /> : "";

  // get client by vat
  const handleOnSubmitByVat = async (event) => {
    event.preventDefault();
    dispatch(addSpinner());

    const { data, status } = await clientRequest.get(`/clients/${vatNo}`);

    if (status === 200) {
      dispatch(getAllClients(data.client));
      resetStateOfInput();
      setIsModalOpen(false);
      dispatch(removeSpinner());
    } else {
      setValidateMessage(data.message);
      dispatch(removeSpinner());
    }
  };
  //  get client by name
  const handleOnSubmitByName = async (event) => {
    event.preventDefault();
    dispatch(addSpinner());

    const { data, status } = await clientRequest.get(
      `/clients/name/${companyName}`
    );

    if (status === 200) {
      dispatch(getAllClients(data.client));
      resetStateOfInput();
      setIsModalOpen(false);
      dispatch(removeSpinner());
    } else {
      setValidateMessage(data.message);
      dispatch(removeSpinner());
    }
  };
  useEffect(() => {
    if (isModalOpen) {
      resetStateOfInput();
    }
  }, [isModalOpen]);

  const validateMessageComponent = validateMessage.length ? (
    <p className={styles.validateMessage}>{validateMessage}</p>
  ) : null;

  return (
    <Modal isModalOpen={isModalOpen} handleOnCloseModal={handleOnCloseModal}>
      <div className={styles.wrapper}>
        <div>{validateMessageComponent}</div>
        <form
          className={styles.form}
          method="get"
          onSubmit={handleOnSubmitByVat}
        >
          <div className={styles.search}>
            <input
              onChange={handleOnChangeVat}
              type="text"
              value={vatNo}
              placeholder="podaj nip klienta"
            />
          </div>

          <div className={styles.buttons}>
            <Button type="submit" name="szukaj" />
          </div>
        </form>
        <form
          className={styles.form}
          method="get"
          onSubmit={handleOnSubmitByName}
        >
          <div className={styles.search}>
            <input
              onChange={handleOnChangeName}
              type="text"
              value={companyName}
              placeholder="podaj nazwę klienta"
            />
          </div>

          <div className={styles.buttons}>
            <Button type="submit" name="szukaj" />
            <Button type="button" onClick={handleOnCloseModal} name="wyjdź" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SearchModal;
