import { useHistory } from "react-router-dom";

import styles from "./backButtom.module.scss";

const BackButton = ({ type }) => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };
  return (
    <button type={type} className={styles.backButton} onClick={handleGoBack}>
      wstecz
    </button>
  );
};

export default BackButton;
