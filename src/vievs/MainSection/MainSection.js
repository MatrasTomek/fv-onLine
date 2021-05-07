import { useSelector } from "react-redux";

import WelcomeSite from "../WelcomeSite";
import LoggedMenu from "../LoggedMenu";

import styles from "./mainSection.module.scss";

function MainSection() {
  const login = useSelector((store) => store.login);
  const cookie = useSelector((store) => store.cookie);

  const mainViev =
    login.length || cookie.length ? <LoggedMenu /> : <WelcomeSite />;
  return <div className={styles.wrapper}>{mainViev}</div>;
}

export default MainSection;
