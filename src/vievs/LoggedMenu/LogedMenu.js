import { Link } from "react-router-dom";
import { Button } from "../../components";

import styles from "./loggedMenu.module.scss";

const LoggedMenu = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <Link to="/">
          <Button name="faktury" />
        </Link>
        <Link to="/customers">
          <Button name="klienci" />
        </Link>
        <Link to="/">
          <Button name="rozliczenia" />
        </Link>
      </div>
    </div>
  );
};

export default LoggedMenu;
