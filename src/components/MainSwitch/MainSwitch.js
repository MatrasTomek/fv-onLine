import { Switch, Route } from "react-router-dom";

import { MainSection } from "../../vievs";

const MainSwitch = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <MainSection />} />
        {/* <Route exact path="/rodo" render={() => <Rodo />} /> */}
        {/* <Route exact path="/instruction" render={() => <Instruction />} /> */}
        {/* <Route exact path="/contact" render={() => <Contact />} /> */}
        {/* <Route exact path="/test-form" render={() => <TestFormSection />} /> */}
        {/* <Route exact path="/order-print" render={() => <OrderPrintViev />} /> */}
        {/* <Route exact path="/orders" render={() => <Orders />} /> */}
      </Switch>
    </>
  );
};
export default MainSwitch;
