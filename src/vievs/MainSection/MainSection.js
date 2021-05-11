import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cookieSet } from "../../data/actions/cookieAction";
import { checkCookie } from "../../helpers/session";

import WelcomeSite from "../WelcomeSite";
import LoggedMenu from "../LoggedMenu";

import styles from "./mainSection.module.scss";

function MainSection() {
  const dispatch = useDispatch();

  const [cookieInfo, setCookieInfo] = useState(false);

  useEffect(() => {
    setCookieInfo(checkCookie());
  }, []);

  useEffect(() => {
    if (!cookieInfo) {
      return;
    } else {
      dispatch(cookieSet());
    }
  }, [cookieInfo]);

  const login = useSelector((store) => store.login[0].isLogin);
  const cookie = useSelector((store) => store.cookie[0].isCookie);

  const mainViev = login || cookie ? <LoggedMenu /> : <WelcomeSite />;
  return <div className={styles.wrapper}>{mainViev}</div>;
}

export default MainSection;
