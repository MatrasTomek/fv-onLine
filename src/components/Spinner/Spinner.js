import { useSelector } from "react-redux";
import styles from "./spinner.module.scss";

const Spinner = () => {
  const spinner = useSelector((store) => store.spinner);
  const spinnerViev = spinner ? (
    <div className={styles.wrapper}>
      <div className={styles.spinnerEclipse}>
        <div className={styles.ldio}>
          <div></div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
  return <>{spinnerViev}</>;
};
export default Spinner;
