import { HashRouter as Router } from "react-router-dom";
import { Fragment } from "react";
import Spinner from "./components/Spinner/Spinner";
import Header from "./vievs/Header/Header";
import MainSwitch from "./components/MainSwitch/MainSwitch";
import React from "react";

function App() {
  return (
    <Router>
      <Header />
      <Fragment>
        <MainSwitch />
      </Fragment>
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
