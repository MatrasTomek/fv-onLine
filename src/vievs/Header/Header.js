import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginDel, cookieDel } from "../../data/actions";
import { deleteCoockie } from "../../helpers/session";

import { Button, Menu } from "../../components";
import { LoginForm } from "../../vievs";
import styles from "./header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const cookie = useSelector((store) => store.cookie[0].isCookie);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  console.log(isMenuOpen);

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

  const logOnLogOffButton = !cookie ? (
    <Button name="zaloguj" onClick={handleOpenModal} />
  ) : (
    <Button name="wyloguj" onClick={handleLogOff} />
  );

  const menuButton = !cookie ? (
    ""
  ) : (
    <Button name="menu" onClick={handleOpenMenu} />
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1>Faktury onLine</h1>
      </div>

      <div className={styles.options}>
        {logOnLogOffButton}
        {menuButton}
        <Button name="testuj" />
      </div>
      <LoginForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
};

export default Header;
