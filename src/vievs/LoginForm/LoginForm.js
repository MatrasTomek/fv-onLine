import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginPost,
  cookieSet,
  addSpinner,
  removeSpinner,
} from "../../data/actions";
import request from "../../helpers/request";
import { addCookie } from "../../helpers/session";
import { Modal, Button } from "../../components";

import styles from "./loginForm.module.scss";

const LoginForm = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [validateMessage, setValidateMessage] = useState("");

  // const spinner = showSpinner ? <Spinner /> : "";

  const handleOnChangeLogin = (event) => setLogin(event.target.value);
  const handleOnChangePassword = (event) => setPassword(event.target.value);
  const handleOnCloseModal = (event) => {
    event.preventDefault();
    setIsModalOpen(false);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    dispatch(addSpinner());
    // obj what we need in actions
    const { data, status } = await request.post("/users", {
      login: login,
      password: password,
    });
    setValidateMessage(false);
    if (status === 200) {
      dispatch(cookieSet());
      dispatch(loginPost());
      addCookie();
      setIsModalOpen(false);
      dispatch(removeSpinner());
    } else {
      setValidateMessage(data.message);
      dispatch(removeSpinner());
      console.log(data.message);
    }
  };

  const validateMessageComponent = validateMessage.length ? (
    <p className={styles.validateMessage}>{validateMessage}</p>
  ) : null;

  return (
    <Modal isModalOpen={isModalOpen} handleOnCloseModal={handleOnCloseModal}>
      <div className={styles.wrapper}>
        <div className={styles.infromation}>{validateMessageComponent}</div>
        <form className={styles.form} method="post" onSubmit={handleOnSubmit}>
          <div className={styles.login}>
            <input
              className={styles.input}
              onChange={handleOnChangeLogin}
              type="text"
              value={login}
              placeholder="Login"
            />
          </div>
          <div className={styles.password}>
            <input
              className={styles.input}
              onChange={handleOnChangePassword}
              type="password"
              value={password}
              placeholder="Hasło"
            />
          </div>
          <div className={styles.buttons}>
            <Button type="submit" name="zaloguj" />
            <Button type="button" name="wyjdź" onClick={handleOnCloseModal} />
          </div>
        </form>
        {/* <div className={styles.spinnerWrapper}>{spinner}</div> */}
      </div>
    </Modal>
  );
};

export default LoginForm;
