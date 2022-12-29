import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { MONTHS_INFO } from "../../../helpers/monthsInfo";
import invoiceNumber from "../../../helpers/invoiceNumber";
import { addSpinner, removeSpinner, getAllInvoices, timeoutShowTask } from "../../../data/actions";
import request from "../../../helpers/request";
import { Button, Modal } from "../../../components";
import styles from "./showInvoice.module.scss";

const ShowInvoice = ({ isModalOpen, setIsModalOpen }) => {
	const invoicesObj = useSelector((store) => store.invoicesObj);
	const clients = useSelector((store) => store.clients);
	const exchange = useSelector((store) => store.exchange);
	const isEdit = useSelector((store) => store.isEdit[0].isEdit);
	const editData = useSelector((store) => store.isEdit[0].data[0]);
	const testBase = useSelector((store) => store.testBase);

	const history = useHistory();

	const dispatch = useDispatch();

	const { companyName, companyAdress, vatNo } = !clients[0] ? "" : clients[0];
	const {
		dateOfIssue,
		dateOfSales,
		dateOfPayment,
		kindOfPayment,
		description,
		additionalDescription,
		netPrice,
		currency,
		quantity,
		vat,
	} = !invoicesObj[0] ? "" : invoicesObj[0];

	const { effectiveDate, mid, no } = !exchange.length ? "" : exchange[0];

	const clientData = !clients.length ? (
		""
	) : (
		<div>
			<p>Nabywca:</p>
			<h4>{companyName}</h4>
			<p>{companyAdress}</p>
			<p>{vatNo}</p>
		</div>
	);

	const netValue = Number(netPrice) * Number(quantity);

	const vatValue = (netValue * Number(vat)) / 100;

	const grossValue = netValue + vatValue;

	const exchangeRate = netValue * mid;

	const discriptionTaxForCurr =
		currency === "Pln" ? (
			""
		) : (
			<p>
				Wartość netto w pln <span>{exchangeRate.toFixed(2)}</span>, wartosć podatku VAT w pln{" "}
				<span>{(vatValue * mid).toFixed(2)}</span> wg kursu Euro z dnia{" "}
				<span>
					{effectiveDate}, <span>{mid}pln</span>{" "}
				</span>
				, tabela: <span>{no}</span>
			</p>
		);

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleSaveInvoice = async () => {
		dispatch(addSpinner());
		if (testBase) {
			if (!isEdit) {
				const date = new Date();
				const year = date.getFullYear();
				const month = date.getMonth();
				let invoiceNo;
				if (localStorage.getItem("invoiceNo") === null) {
					const localInvoiveNo = {
						invoiceNo: "1",
					};
					localStorage.setItem("invoiceNo", JSON.stringify(localInvoiveNo));
					invoiceNo = `1/${MONTHS_INFO[month]}/${year}`;
				} else {
					const localInvoiveNo = JSON.parse(localStorage.getItem("invoiceNo"));
					const newInvoiceNo = Number(localInvoiveNo.invoiceNo) + 1;
					invoiceNo = `${newInvoiceNo}/${MONTHS_INFO[month]}/${year}`;
					const setLocalNewInvoiceNumer = newInvoiceNo.toString();
					const newLocalInvoiveNo = {
						invoiceNo: setLocalNewInvoiceNumer,
					};
					localStorage.setItem("invoiceNo", JSON.stringify(newLocalInvoiveNo));
				}
				const invoiceObj = {
					_id: "0.01",
					invoiceNo: invoiceNo,
					client: clients[0],
					invoice: invoicesObj[0],
					exchange: !exchange[0] ? { no: "0" } : exchange[0],
				};
				localStorage.setItem("invoice", JSON.stringify(invoiceObj));
				dispatch(getAllInvoices([invoiceObj]));
				dispatch(removeSpinner());
				dispatch(timeoutShowTask("faktura dodana"));
				history.push("/invoices");
			} else {
				const invoiceObj = {
					_id: editData._id,
					invoiceNo: editData.invoiceNo,
					client: clients[0],
					invoice: invoicesObj[0],
					exchange: !exchange[0] ? { no: "0" } : exchange[0],
				};
				localStorage.setItem("invoice", JSON.stringify(invoiceObj));
				dispatch(getAllInvoices([invoiceObj]));
				dispatch(removeSpinner());
				dispatch(timeoutShowTask("dane faktury zmienione"));
				history.push("/invoices");
			}
		} else {
			if (!isEdit) {
				const invoiceNoDB = await invoiceNumber(invoicesObj[0].dateOfIssue.slice(5, 7));

				const date = new Date();
				const year = date.getFullYear();
				const invoiceNo = `${invoiceNoDB.number}/${MONTHS_INFO[Number(invoiceNoDB.month) - 1]}/${year}`;

				const invoiceObj = {
					invoiceNo: invoiceNo,
					client: clients[0],
					invoice: invoicesObj[0],
					exchange: !exchange[0] ? { no: "0" } : exchange[0],
				};

				const { data } = await request.post("/invoice", invoiceObj);

				if (data) {
					dispatch(removeSpinner());
					dispatch(getAllInvoices([data]));
					dispatch(timeoutShowTask("faktura dodana"));
					history.push("/invoices");
				} else {
					dispatch(removeSpinner());
					console.log(data.info);
				}
			} else {
				const invoiceObj = {
					id: editData._id,
					invoiceNo: editData.invoiceNo,
					client: clients[0],
					invoice: invoicesObj[0],
					exchange: !exchange[0] ? { no: "0" } : exchange[0],
				};
				const { data, status } = await request.put("/invoice", invoiceObj);
				if (status === 202) {
					dispatch(removeSpinner());

					dispatch(getAllInvoices([data.data]));
					dispatch(timeoutShowTask("dane faktury zmienione"));
					history.push("/invoices");
				} else {
					dispatch(removeSpinner());
					console.log(data.message);
				}
			}
		}
	};
	return (
		<Modal isModalOpen={isModalOpen}>
			<div className={styles.wrapper}>
				<div className={styles.buyer}>{clientData}</div>
				<div className={styles.invoiceDetails}>
					<div className={styles.dates}>
						<div>
							<p>data wystawienia:</p>
							<p>{dateOfIssue}</p>
						</div>
						<div>
							<p>data sprzedaży:</p>
							<p>{dateOfSales}</p>
						</div>
						<div>
							<p>termin płatności:</p>
							<p>{dateOfPayment}</p>
						</div>
						<div>
							<p>forma płatności:</p>
							<p>{kindOfPayment}</p>
						</div>
						<div>
							<p>Opis:</p>
							<p>{description}</p>
							<p>{additionalDescription}</p>
						</div>
					</div>
					<div className={styles.prices}>
						<div>
							<p>cena netto:</p>
							<p>{Number(netPrice).toFixed(2)}</p>
							<p>{currency}</p>
						</div>
						<div>
							<p>ilość:</p>
							<p>{quantity}</p>
						</div>
						<div>
							<p>wartość netto:</p>
							<p>{netValue.toFixed(2)}</p>
							<p>{currency}</p>
						</div>
					</div>
					<div className={styles.taxes}>
						<div>
							<p>stawka VAT:</p>
							<p>{vat}%</p>
						</div>
						<div>
							<p>wartość VAT:</p>
							<p>
								{vatValue.toFixed(2)} {currency}
							</p>
						</div>
						<div>
							<p>warość brutto: </p>
							<p>
								{grossValue.toFixed(2)} {currency}
							</p>
						</div>
					</div>
					<div className={styles.discribes}>{discriptionTaxForCurr}</div>
				</div>
				<div className={styles.buttons}>
					<Button name="wstecz" onClick={handleCloseModal} />
					<Button name="zapisz" onClick={handleSaveInvoice} />
				</div>
			</div>
		</Modal>
	);
};

export default ShowInvoice;
