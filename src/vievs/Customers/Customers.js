import { useState } from "react";
import clientRequest from "../../helpers/clientRequest";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllClients,
  addSpinner,
  removeSpinner,
  timeoutShowTask,
} from "../../data/actions/";

import {
  AddClientForm,
  BackButton,
  Button,
  ClientItem,
  SearchModal,
} from "../../components";

import styles from "./customers.module.scss";

const Customers = () => {
  const testBase = useSelector((store) => store.testBase);

  const dispatch = useDispatch();

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);

  const handleFromModalOpen = () => {
    setFormModalOpen(true);
  };
  const handleSearchModalOpen = () => {
    setSearchModalOpen(true);
  };

  const handleGetAllClients = async () => {
    dispatch(addSpinner());
    if (testBase) {
      if (localStorage.getItem("client") === null) {
        dispatch(timeoutShowTask("w Twojej bazei nie ma żadnych klientów"));
        dispatch(removeSpinner());
      } else {
        const retrievedObject = JSON.parse(localStorage.getItem("client"));
        dispatch(getAllClients([retrievedObject]));
        dispatch(removeSpinner());
      }
    } else {
      const { data, status } = await clientRequest.get("/clients");

      if (status === 200) {
        dispatch(getAllClients(data.data));
        dispatch(removeSpinner());
      } else {
        console.log(data.message);
      }
    }
  };

  const clients = useSelector((store) => store.clients);

  const allClientsViev = clients.map((client) => (
    <ClientItem key={Math.random() * 0.234} client={client} />
  ));

  return (
    <div className={styles.wrapper}>
      <h1>Moduł klienta</h1>
      <div className={styles.selectButttons}>
        <BackButton />
        <Button name="dodaj kontrahenta" onClick={handleFromModalOpen} />
        <AddClientForm
          isModalOpen={formModalOpen}
          setIsModalOpen={setFormModalOpen}
        />
        <Button
          name="szukaj kontrahenta"
          onClick={handleSearchModalOpen}
          type="button"
          disabled={!testBase ? false : true}
        />
        <SearchModal
          isModalOpen={searchModalOpen}
          setIsModalOpen={setSearchModalOpen}
        />
        <Button
          name={!clients.length ? "pobierz wszystko" : "odśwież listę"}
          onClick={handleGetAllClients}
        />
      </div>

      <div className={styles.clientsList}>{allClientsViev}</div>
    </div>
  );
};
export default Customers;
