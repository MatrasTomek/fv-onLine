import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearClentState } from "../../data/actions";
import styles from "./menu.module.scss";

const Menu = ({ isMenuOpen, setIsMenuOpen }) => {
  const dispatch = useDispatch();

  const handleOnCloseMenu = () => {
    setIsMenuOpen(false);
    dispatch(clearClentState());
  };
  return (
    <div
      className={styles.wrapper}
      style={{
        top: `${!isMenuOpen ? "-140px" : "0px"}`,
      }}
    >
      <div className={styles.close} onClick={handleOnCloseMenu}>
        X
      </div>
      <div className={styles.inside}>
        <Link to="/invoices" onClick={handleOnCloseMenu}>
          faktury
        </Link>
        <Link to="/invoices/add" onClick={handleOnCloseMenu}>
          dodaj fakture
        </Link>
        <Link to="/customers" onClick={handleOnCloseMenu}>
          klienci
        </Link>
        <Link to="/settlements" onClick={handleOnCloseMenu}>
          rozliczenia
        </Link>
      </div>
    </div>
  );
};

export default Menu;
