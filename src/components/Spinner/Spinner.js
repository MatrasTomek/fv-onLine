import styles from "./spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinnerEclipse}>
        <div className={styles.ldio}>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default Spinner;
