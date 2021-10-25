import React, {useEffect} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import WelcomePage from "./Components/WelcomePage";
import ExchangePage from "./Components/ExchangePage";
import ConverterPage from "./Components/ConventerPage";
import Header from "./Components/Header";

function App() {
  useEffect(() => {
  })
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
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
