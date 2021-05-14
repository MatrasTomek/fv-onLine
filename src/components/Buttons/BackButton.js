import { useHistory } from "react-router-dom";

import styles from "./backButtom.module.scss";

const BackButton = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };
  return (
    <button className={styles.backButton} onClick={handleGoBack}>
      wstecz
    </button>
  );
};

export default BackButton;
