import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useTypedDispatch, useTypedSelector} from "../hooks/redux-hooks/redux-hooks";
import {getBaseCurrenciesRates, setBaseCurrency, setQuantity} from "../redux/reducers/mainReducer";
import {currenciesRatesArrayElement} from "../redux/reducers/interfaces";

const ConverterPage = () => {

  const [toCurrency, setToCurrency] = useState<string>('')
  const [convertResult, setConvertResult] = useState<number>()

  const dispatch = useTypedDispatch()
  const {listOfCurrencies,
    listOfRatesToBase,
    baseCurrency,
    quantity} = useTypedSelector(state => state.currencies)

  useEffect(() => {
    baseCurrency
      ? dispatch(getBaseCurrenciesRates({base : baseCurrency}))
      : dispatch(getBaseCurrenciesRates({base : 'PLN'}))
  }, [baseCurrency])

  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency')
    if(savedCurrency) {
      dispatch(setBaseCurrency(savedCurrency))
    } else {
      dispatch(setBaseCurrency( 'PLN'))
    }
    setToCurrency('USD')
  }, [])

  useEffect(() => {
    convertCurrency()
  }, [toCurrency, quantity, baseCurrency, listOfCurrencies])

  const convertCurrency = () => {
    const rate: currenciesRatesArrayElement | undefined = listOfRatesToBase.find((item: currenciesRatesArrayElement) => item[0] === toCurrency)
    rate && quantity && setConvertResult(rate[1] * parseFloat(quantity))
  }


  return (
    <div>
      <form>
        <label>Amount</label>
        {/*@ts-ignore*/}
        <input value={quantity} type="number"  onChange={(e) => dispatch(setQuantity(e.target.value))} />
        <label>
          From
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
        <label>
          To
        </label>
        <select onChange={(e) => {
          setToCurrency(e.target.value)}}>
          {listOfRatesToBase && listOfRatesToBase.map((item: any) => {
            return <option value={item[0]} key={item[0]}>
              {item[0]}
            </option>
          })}
        </select>
        <input value={convertResult} type="number"  />
      </form>
    </div>
  );
};

export default ConverterPage;
