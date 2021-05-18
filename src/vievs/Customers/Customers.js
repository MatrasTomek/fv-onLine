import { useState } from "react";
import clientRequest from "../../helpers/clientRequest";
import { useSelector, useDispatch } from "react-redux";
import { getAllClients, addSpinner, removeSpinner } from "../../data/actions/";

import {
  AddClientForm,
  BackButton,
  Button,
  ClientItem,
  SearchModal,
} from "../../components";

import styles from "./customers.module.scss";

const Customers = () => {
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
    const { data, status } = await clientRequest.get("/clients");

    if (status === 200) {
      dispatch(getAllClients(data.data));
      dispatch(removeSpinner());
    } else {
      console.log(data.message);
    }
  };

  const clients = useSelector((store) => store.clients);

  const allClientsViev = clients.map((client) => (
    <ClientItem key={client._id} client={client} />
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
        <Button name="szukaj kontrahenta" onClick={handleSearchModalOpen} />
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
