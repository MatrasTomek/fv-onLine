import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { MainSection, Customers, Invoices, Settlements } from "../../vievs";
import { AddInvoice } from "../InvoiceModule";

const MainSwitch = () => {
  const cookie = useSelector((store) => store.cookie[0].isCookie);
  const testBase = useSelector((store) => store.testBase);
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <MainSection />} />
        {/* <Route exact path="/rodo" render={() => <Rodo />} /> */}
        {/* <Route exact path="/instruction" render={() => <Instruction />} /> */}
        {/* <Route exact path="/contact" render={() => <Contact />} /> */}

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
          <Route exact path="/settlements" render={() => <Settlements />} />
        ) : (
          ""
        )}

        {/* <Route exact path="/order-print" render={() => <OrderPrintViev />} /> */}
        {/* <Route exact path="/orders" render={() => <Orders />} /> */}
      </Switch>
    </>
  );
};
export default MainSwitch;
