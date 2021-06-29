import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MainSection,
  Customers,
  Invoices,
  Settlements,
  Rodo,
  Contact,
} from "../../vievs";
import { AddInvoice, PrintInvoice } from "../../components";

const MainSwitch = () => {
  const cookie = useSelector((store) => store.cookie[0].isCookie);
  const testBase = useSelector((store) => store.testBase);
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <MainSection />} />

        {cookie || testBase ? (
          <Route exact path="/customers" render={() => <Customers />} />
        ) : (
          ""
        )}
        {cookie || testBase ? (
          <Route exact path="/invoices" render={() => <Invoices />} />
        ) : (
          ""
        )}
        {cookie || testBase ? (
          <Route exact path="/invoices/add" render={() => <AddInvoice />} />
        ) : (
          ""
        )}
        {cookie || testBase ? (
          <Route exact path="/invoices/print" render={() => <PrintInvoice />} />
        ) : (
          ""
        )}
        {cookie || testBase ? (
          <Route exact path="/settlements" render={() => <Settlements />} />
        ) : (
          ""
        )}

        <Route exact path="/rodo" render={() => <Rodo />} />
        <Route exact path="/contact" render={() => <Contact />} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};
export default MainSwitch;
