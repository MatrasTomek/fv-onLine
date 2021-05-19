import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { MainSection, Customers, Invoices } from "../../vievs";
import { AddInvoice } from "../InvoiceModule";

const MainSwitch = () => {
  const cookie = useSelector((store) => store.cookie[0].isCookie);
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <MainSection />} />
        {/* <Route exact path="/rodo" render={() => <Rodo />} /> */}
        {/* <Route exact path="/instruction" render={() => <Instruction />} /> */}
        {/* <Route exact path="/contact" render={() => <Contact />} /> */}

        {cookie ? (
          <Route exact path="/customers" render={() => <Customers />} />
        ) : (
          ""
        )}
        {cookie ? (
          <Route exact path="/invoices" render={() => <Invoices />} />
        ) : (
          ""
        )}
        {cookie ? (
          <Route exact path="/invoices/add" render={() => <AddInvoice />} />
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
