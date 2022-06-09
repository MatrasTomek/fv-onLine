import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSpinner, removeSpinner, getDescribe, removeTestBase } from "../../data/actions";
import request from "../../helpers/request";

import { Button } from "../../components";
import styles from "./loggedMenu.module.scss";

const LoggedMenu = () => {
	const testBase = useSelector((store) => store.testBase);

	const dispatch = useDispatch();

	const history = useHistory();
	const handleGetData = async () => {
		// dispatch(addSpinner());

		const { data } = await request.get("/describe");

		if (data) {
			dispatch(getDescribe(data));
			dispatch(removeSpinner());
		} else {
			dispatch(removeSpinner());
		}
	};

	const handleGoOnStart = () => {
		dispatch(removeTestBase());
		history.push("./");
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.buttons}>
				{testBase ? <Button type="button" name="wstecz" onClick={handleGoOnStart} /> : ""}
				<Link to="/invoices">
					<Button name="faktury" onClick={handleGetData} />
				</Link>
				<Link to="/customers">
					<Button name="klienci" />
				</Link>
				<Link to="/settlements">
					<Button name="rozliczenia" disabled={testBase ? true : false} />
					<div className={styles.infoButton}>
						<p>opcja dostępna po zalogowaniu</p>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default LoggedMenu;
