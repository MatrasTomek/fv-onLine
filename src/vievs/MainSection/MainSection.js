import { useSelector } from "react-redux";

import WelcomeSite from "../WelcomeSite";
import LoggedMenu from "../LoggedMenu";

import styles from "./mainSection.module.scss";

function MainSection() {
  const login = useSelector((store) => store.login[0].isLogin);
  const cookie = useSelector((store) => store.cookie[0].isCookie);
  const testBase = useSelector((store) => store.testBase);

  const mainViev =
    login || cookie || testBase ? <LoggedMenu /> : <WelcomeSite />;
  return <div className={styles.wrapper}>{mainViev}</div>;
}

export default MainSection;
