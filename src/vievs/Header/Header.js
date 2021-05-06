import { Button } from "../../components";

import styles from "./header.module.scss";

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1>Faktury onLine</h1>
      </div>

      <div className={styles.options}>
        <Button name="zaloguj" />
        <Button name="testuj" />
      </div>
    </div>
  );
};

export default Header;
