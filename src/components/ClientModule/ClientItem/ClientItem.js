import { useState } from "react";
import { AddClientForm, Button, DeleteConfirmation } from "../../../components";
import styles from "./clientItem.module.scss";

const ClientItem = ({ client }) => {
  const { companyAdress, companyName, eMail, vatNo, _id, info } = client;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);

  const handleOnEdit = () => {
    setIsModalOpen(true);
  };

  const handleDeleteConfirmation = (e) => {
    setIsConfirmationOpen(true);
    setDeleteItem(e.target.id);
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
        <Button
          name="usuń"
          onClick={handleDeleteConfirmation}
          id="clientToDel"
        />
      </div>
      <AddClientForm
        client={client}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <DeleteConfirmation
        isModalOpen={isConfirmationOpen}
        setIsModalOpen={setIsConfirmationOpen}
        id={_id}
        deleteItem={deleteItem}
      />
    </div>
  );
};

export default ClientItem;
