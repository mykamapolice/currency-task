import React, {useEffect} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import WelcomePage from "./Components/WelcomePage";
import ExchangePage from "./Components/ExchangePage/ExchangePage";
import ConverterPage from "./Components/ConventerPage/ConventerPage";
import Header from "./Components/Header";
import {getCurrenciesRates} from "./redux/reducers/mainReducer";
import {useTypedDispatch} from "./hooks/redux-hooks/redux-hooks";
import './app.scss'

function App() {

  const dispatch = useTypedDispatch()

  useEffect(() => {
    dispatch(getCurrenciesRates(''))
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div>
        <Switch>
          <Route path="/exchange" component={ExchangePage} />
          <Route path="/converter" component={ConverterPage} />
          <Redirect from="*" to="/exchange" />
        </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
