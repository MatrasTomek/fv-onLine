import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSpinner, removeSpinner, getDescribe } from "../../data/actions";
import request from "../../helpers/request";

import { Button } from "../../components";
import styles from "./loggedMenu.module.scss";

const LoggedMenu = () => {
  const dispatch = useDispatch();

  const handleGetData = async () => {
    dispatch(addSpinner());

    const { data, status } = await request.get("/describe");
    if (status === 200) {
      console.log(data.data);
      dispatch(getDescribe(data.data));

      dispatch(removeSpinner());
    } else {
      dispatch(removeSpinner());
      console.log(data.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <Link to="/invoices">
          <Button name="faktury" onClick={handleGetData} />
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
