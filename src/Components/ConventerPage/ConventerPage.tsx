import React, {useEffect, useState} from 'react';
import {useTypedDispatch, useTypedSelector} from "../../hooks/redux-hooks/redux-hooks";
import {getBaseCurrenciesRates, setBaseCurrency, setQuantity} from "../../redux/reducers/mainReducer";
import {currenciesRatesArrayElement} from "../../redux/reducers/interfaces";
import {Select, Input, Result} from 'antd';
import './conventerpage.scss'

const ConverterPage = () => {

  const [toCurrency, setToCurrency] = useState<string>('')
  const [convertResult, setConvertResult] = useState<number>(0)

  const dispatch = useTypedDispatch()
  const {listOfCurrencies,
    listOfRatesToBase,
    baseCurrency,
    quantity} = useTypedSelector(state => state.currencies)

  const { Option } = Select;

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
    rate && quantity
      ? setConvertResult(rate[1] * parseFloat(quantity))
      : setConvertResult(0)
  }

  return (
    <div className='converter-page'>
        <div className='converter-page-amount'>
          <label>Amount</label>
          {/*@ts-ignore*/}
          <Input value={quantity} type="number"  onChange={(e) => dispatch(setQuantity(e.target.value))} />
          <label>
            From
          </label>
          <Select
            showSearch
            style={{ minWidth: 100 }}
            value={baseCurrency}
            onChange={(val) => {dispatch(setBaseCurrency(val))}}>
            {listOfCurrencies && listOfCurrencies.map((item: string) => {
                return <Option value={item} key={item}> {item} </Option>
            })}
          </Select>
          <label>
            To
          </label>
          <Select showSearch onChange={(val) => {// @ts-ignore
            setToCurrency(val)}} style={{ minWidth: 100 }}>
            {listOfRatesToBase && listOfRatesToBase.map((item: any) => {
              return <Option value={item[0]} key={item[0]}>
                {item[0]}
              </Option>
            })}
          </Select>
        </div>
        <div className='converter-page-results'>
          <Result
            status="success"
            title={`Result: ${convertResult && convertResult.toFixed(4)}`}
          />
        </div>
    </div>
  );
};

export default ConverterPage;
