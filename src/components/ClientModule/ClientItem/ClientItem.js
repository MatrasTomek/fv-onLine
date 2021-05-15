import { useState } from "react";
import { AddClientForm, Button, DeleteConfirmation } from "../../../components";

import styles from "./clientItem.module.scss";

const ClientItem = ({ client }) => {
  const { companyAdress, companyName, eMail, vatNo, _id, info } = client;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleOnEdit = async () => {
    setIsModalOpen(true);
  };

  const handleDeleteConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  return (
    <div className={styles.wrapper}>
      <h3>{companyName}</h3>
      <div className={styles.item}>
        <p>adres:</p>
        <p>{companyAdress}</p>
      </div>
      <div className={styles.item}>
        <p>Nip:</p>
        <p>{vatNo}</p>
      </div>
      <div className={styles.item}>
        <p>eMail:</p>
        <p>{eMail}</p>
      </div>
      <div className={styles.item}>
        <p>info:</p>
        <p>{info}</p>
      </div>

      <div className={styles.buttons}>
        <Button name="edytuj" onClick={handleOnEdit} />
        <Button name="usuń" onClick={handleDeleteConfirmation} />
      </div>
      <AddClientForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        client={client}
      />
      <DeleteConfirmation
        isModalOpen={isConfirmationOpen}
        setIsModalOpen={setIsConfirmationOpen}
        id={_id}
      />
    </div>
  );
};

export default ClientItem;
