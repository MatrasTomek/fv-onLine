import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteClient, addSpinner, removeSpinner } from "../../../data/actions";

import AddClientForm from "../AddClientForm";
import { Button } from "../../Buttons";
import clientRequest from "../../../helpers/clientRequest";
import styles from "./clientItem.module.scss";

const ClientItem = ({ client }) => {
  const dispatch = useDispatch();
  const { companyAdress, companyName, eMail, vatNo, _id, info } = client;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnEdit = async () => {
    setIsModalOpen(true);
  };

  const handleOnDelete = async () => {
    dispatch(addSpinner());
    try {
      const { status } = await clientRequest.delete(`/clients/${_id}`);

      if (status === 200) {
        dispatch(deleteClient(_id));
        dispatch(removeSpinner());
        // setTaskInformation("Usunięto klienta");
      }
    } catch (error) {
      dispatch(removeSpinner());
      console.warn("cos nie taK");
    }
  };

  return (
    <div className={styles.wrpper}>
      <h3>{companyName}</h3>
      <p>{companyAdress}</p>
      <p>{vatNo}</p>
      <p>{eMail}</p>
      <p>{info}</p>
      <div className={styles.buttons}>
        <Button name="edytuj" onClick={handleOnEdit} />
        <Button name="usuń" onClick={handleOnDelete} />
      </div>
      <AddClientForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        client={client}
      />
    </div>
  );
};

export default ClientItem;
