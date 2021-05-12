import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllClients,
  deleteClient,
} from "../../../data/actions/clientActions";

import { Button } from "../../Buttons";
import clientRequest from "../../../helpers/clientRequest";
import styles from "./clientItem.module.scss";

const ClientItem = ({ client }) => {
  const dispatch = useDispatch();

  const { companyAdress, companyName, eMail, vatNo, _id, info } = client;

  const handleOnDelete = async () => {
    try {
      const { status, data } = await clientRequest.delete(`/clients/${_id}`);

      if (status === 200) {
        dispatch(deleteClient([_id]));

        // setTaskInformation("Usunięto klienta");
      }
    } catch (error) {
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
        {/* <Button name="edytuj" onClick={handleOnEdit}/> */}
        <Button name="usuń" onClick={handleOnDelete} />
      </div>
    </div>
  );
};

export default ClientItem;
