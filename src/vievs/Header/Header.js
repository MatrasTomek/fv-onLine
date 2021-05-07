import { useState } from "react";
import { Button } from "../../components";
import { LoginForm } from "../../vievs";

import styles from "./header.module.scss";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    console.log("ok");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1>Faktury onLine</h1>
      </div>

      <div className={styles.options}>
        <Button name="zaloguj" onClick={handleOpenModal} />
        <Button name="testuj" />
      </div>
      <LoginForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Header;
