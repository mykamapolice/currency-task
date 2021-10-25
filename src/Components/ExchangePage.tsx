import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useTypedDispatch, useTypedSelector} from "../hooks/redux-hooks/redux-hooks";
import {getBaseCurrenciesRates} from "../redux/reducers/mainReducer";
import {setBaseCurrency} from '../redux/reducers/mainReducer'
import {currenciesRatesArrayElement} from "../redux/reducers/interfaces";

const ExchangePage = () => {

  const dispatch = useTypedDispatch()

  const {listOfCurrencies, listOfRatesToBase, baseCurrency} = useTypedSelector(state => state.currencies)

  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency')
    if(savedCurrency) {
      dispatch(setBaseCurrency(savedCurrency))
    } else {
      dispatch(setBaseCurrency( 'PLN'))
    }
  }, [])


  useEffect(() => {
    baseCurrency && dispatch(getBaseCurrenciesRates({base : baseCurrency}))
  }, [baseCurrency])


  return (
    <div>
      <form>
        <label>
          Choose base currency
        </label>
        <select
          onChange={(e) => {dispatch(setBaseCurrency(e.target.value))}}>
          {listOfCurrencies && listOfCurrencies.map((item: string) => {
              if(baseCurrency === item) {
                return <option value={item} key={item} selected> {item} </option>
              } else {
                return <option value={item} key={item}> {item} </option>
              }
          })}
        </select>
      </form>
      {listOfRatesToBase && listOfRatesToBase.map((item: currenciesRatesArrayElement) => {
        return <div key={item[0]}>
            <div>
              {item[0]}
            </div>
            <div>
              {item[1]}
            </div>
        </div>
      })}
    </div>
  );
};

export default ExchangePage;
