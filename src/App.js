import { HashRouter as Router } from "react-router-dom";
import { Fragment } from "react";
import { Spinner, MainSwitch } from "./components";
import { Header } from "./vievs";

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
