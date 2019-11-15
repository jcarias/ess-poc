import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContractGenerator from "./containers/ContractGenerator";
import FormBuilderContainer from "./containers/FormBuilderContainer";
import FormContainer from "./containers/FormContainer";
import ContractContainer from "./containers/ContractContainer";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/form/:formId">
          <FormContainer />
        </Route>
        <Route path="/template/:formId/contract/:contractId">
          <ContractContainer />
        </Route>
        <Route path="/builder/:templateId" exact>
          <FormBuilderContainer />
        </Route>
        <Route path="/builder/">
          <FormBuilderContainer />
        </Route>
        <Route path="/">
          <ContractGenerator />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
