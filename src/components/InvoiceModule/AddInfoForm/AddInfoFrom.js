import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addSpinner,
  removeSpinner,
  timeoutShowTask,
  getDescribe,
} from "../../../data/actions";
import Modal from "../../Modal";
import { Button } from "../../Buttons";

import request from "../../../helpers/request";

import styles from "./addInfoForm.module.scss";

const AddInfoFrom = ({ isModalOpen, setIsModalOpen, dataFrom }) => {
  const dispatch = useDispatch();

  const [describeInfo, setDescribeInfo] = useState("");
  const [validateMessage, setValidateMessage] = useState("");

  const handleOnChange = (event) => setDescribeInfo(event.target.value);

  const handleOnCloseModal = (event) => {
    event.preventDefault();
    setIsModalOpen(false);
  };

  const resetStateOfInput = () => {
    setValidateMessage("");
  };

  const handleOnAddData = async (event) => {
    event.preventDefault();
    dispatch(addSpinner());
    if (dataFrom === "description") {
      const { data, status } = await request.post("/describe", {
        describeName: describeInfo,
      });
      if (status === 201) {
        const { data, status } = await request.get("/describe");
        if (status === 200) {
          dispatch(getDescribe(data.data));
          dispatch(timeoutShowTask("dane dodane"));
          setIsModalOpen(false);
          dispatch(removeSpinner());
        } else {
          dispatch(removeSpinner());
          console.log(data.message);
        }
        resetStateOfInput();
      } else {
        setValidateMessage(data.message);
        dispatch(removeSpinner());
        console.log(data.message);
      }
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
        <form className={styles.form} method="post" onSubmit={handleOnAddData}>
          <div className={styles.search}>
            <input
              onChange={handleOnChange}
              type="text"
              value={describeInfo}
              placeholder="podaj dane"
            />
          </div>

          <div className={styles.buttons}>
            <Button type="submit" name="dodaj" />
            <Button type="button" onClick={handleOnCloseModal} name="wyjdź" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddInfoFrom;
