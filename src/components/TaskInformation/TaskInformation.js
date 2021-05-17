import Modal from "../Modal";
import { useSelector } from "react-redux";

import styles from "./taskInformation.module.scss";

const TaskInformation = () => {
  const task = useSelector((store) => store.task[0]);

  return (
    <Modal isModalOpen={task.isModalOpen}>
      <div className={styles.wrapper}>
        <p>{task.task}</p>
      </div>
    </Modal>
  );
};
export default TaskInformation;
