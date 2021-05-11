import { useState } from "react";
import { Button } from "../../components";
import { LoginForm } from "../../vievs";
import { useSelector, useDispatch } from "react-redux";
import { cookieDel } from "../../data/actions/cookieAction";
import { loginDel } from "../../data/actions/loginActions";
import { deleteCoockie } from "../../helpers/session";
import styles from "./header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const cookie = useSelector((store) => store.cookie[0].isCookie);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleLogOff = () => {
    deleteCoockie("appFormAdmin");
    dispatch(cookieDel());
    dispatch(loginDel());
  };

  const logOnLogOffButton = !cookie ? (
    <Button name="zaloguj" onClick={handleOpenModal} />
  ) : (
    <Button name="wyloguj" onClick={handleLogOff} />
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1>Faktury onLine</h1>
      </div>

      <div className={styles.options}>
        {logOnLogOffButton}
        <Button name="testuj" />
      </div>
      <LoginForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Header;
