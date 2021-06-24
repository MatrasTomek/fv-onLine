import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSpinner,
  removeSpinner,
  getAllInvoices,
  timeoutShowTask,
} from "../../data/actions";
import request from "../../helpers/request";
import { Button, SearchModal, SettlementItem } from "../../components";
import styles from "./settlements.module.scss";

const Settlements = () => {
  const client = useSelector((store) => store.clients);
  const dispatch = useDispatch();
  const [invoicesStatus, setInvoicesStatus] = useState(false);

  //Open SearchModal
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const handleSearchModalOpen = () => {
    setSearchModalOpen(true);
    setInvoicesStatus(false);
  };

  //Take data about client
  const handleOnTakeData = async () => {
    dispatch(addSpinner());
    const invoivesDataOfClient = [];
    const { data, status } = await request.get("/invoice");
    if (status === 200) {
      data.data.forEach((item) => {
        if (item.client.vatNo === client[0].vatNo) {
          invoivesDataOfClient.push(item);

          return invoivesDataOfClient;
        }
      });

      if (!invoivesDataOfClient.length) {
        dispatch(
          timeoutShowTask("Nie ma wystawionych faktur dla tego klienta.")
        );
      }
      setInvoicesStatus(invoivesDataOfClient);
      dispatch(removeSpinner());
    } else {
      dispatch(removeSpinner());
      console.log(data.message);
    }
  };

  // Show invoices
  const showInvoices = !invoicesStatus
    ? ""
    : invoicesStatus.map((item) => (
        <SettlementItem key={item._id} item={item} />
      ));

  //Show client
  const clientViev = !client.length ? (
    ""
  ) : (
    <div>
      <p>{client[0].companyName}</p>
      <p>{client[0].companyAdress}</p>
      <p>{client[0].vatNo}</p>
      <Button type="button" name="pobierz dane" onClick={handleOnTakeData} />
    </div>
  );

  // console.log(invoicesStatus);

  return (
    <div className={styles.wrapper}>
      <h1>Moduł rozliczeń</h1>
      <div className={styles.search}>
        <Button
          type="button"
          name={!client[0] ? "pobierz klienta" : "zmień klienta"}
          onClick={handleSearchModalOpen}
        />
      </div>
      <div className={styles.client}>{clientViev}</div>
      <div className={styles.invoices}>{showInvoices}</div>
      <SearchModal
        isModalOpen={searchModalOpen}
        setIsModalOpen={setSearchModalOpen}
      />
    </div>
  );
};

export default Settlements;
