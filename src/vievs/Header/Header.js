import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginDel, cookieDel, setTestBase } from "../../data/actions";
import { deleteCoockie } from "../../helpers/session";

import { Button, Menu } from "../../components";
import { LoginForm } from "../../vievs";
import styles from "./header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const cookie = useSelector((store) => store.cookie[0].isCookie);
  const testBase = useSelector((store) => store.testBase);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const history = useHistory();

  const handleLogOff = () => {
    deleteCoockie("appFormAdmin");
    dispatch(cookieDel());
    dispatch(loginDel());
    history.push("./");
  };

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleSetTestBase = () => {
    dispatch(setTestBase());
  };

  const logOnLogOffButton = !cookie ? (
    <Button name="zaloguj" onClick={handleOpenModal} />
  ) : (
    <Button name="wyloguj" onClick={handleLogOff} />
  );

  const menuButton =
    !cookie && !testBase ? "" : <Button name="menu" onClick={handleOpenMenu} />;

  const testButton =
    cookie || testBase ? (
      ""
    ) : (
      <Button name="testuj" onClick={handleSetTestBase} />
    );

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1>Faktury onLine</h1>
      </div>

      <div className={styles.options}>
        {logOnLogOffButton}
        {menuButton}
        {testButton}
      </div>
      <LoginForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default Header;
