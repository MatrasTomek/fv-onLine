import { useDispatch } from "react-redux";
import { addSpinner, removeSpinner, deleteClient } from "../../data/actions";
import clientRequest from "../../helpers/clientRequest";

import { Button, Modal } from "..";
import styles from "./deleteConfirmation.module.scss";

const DeleteConfirmation = ({ isModalOpen, setIsModalOpen, id }) => {
  const dispatch = useDispatch();

  const handleOnDelete = async () => {
    dispatch(addSpinner());
    try {
      const { status } = await clientRequest.delete(`/clients/${id}`);

      if (status === 200) {
        dispatch(deleteClient(id));
        dispatch(removeSpinner());
        // setTaskInformation("Usunięto klienta");
      }
    } catch (error) {
      dispatch(removeSpinner());
      console.warn("cos nie taK");
    }
  };

  const handleOnClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal isModalOpen={isModalOpen}>
      <div className={styles.wrapper}>
        <p>Czy na pewno chcesz usunać?</p>
        <div className={styles.buttons}>
          <Button name="usuń" onClick={handleOnDelete} />
          <Button name="wyjdź" onClick={handleOnClose} />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
