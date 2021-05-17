import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cookieSet } from "./data/actions/cookieAction";
import { checkCookie } from "./helpers/session";
import { HashRouter as Router } from "react-router-dom";
import { Fragment } from "react";
import { Spinner, MainSwitch, TaskInformation } from "./components";
import { Header } from "./vievs";

import React from "react";

function App() {
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
  }, [cookieInfo, dispatch]);
  return (
    <Router>
      <Header />
      <Fragment>
        <MainSwitch />
      </Fragment>
      <Spinner />
      <TaskInformation />
    </Router>
  );
}

function RootApp() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <App />
    </React.Suspense>
  );
}

export default RootApp;
