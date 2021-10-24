import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import WelcomePage from "./Components/WelcomePage";
import ExchangePage from "./Components/ExchangePage";
import ConverterPage from "./Components/ConventerPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route path="/exchange" component={ExchangePage} />
          <Route path="/converter" component={ConverterPage} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
