import React, {useEffect, useState} from 'react';
import {useTypedDispatch, useTypedSelector} from "../../hooks/redux-hooks/redux-hooks";
import {getBaseCurrenciesRates} from "../../redux/reducers/mainReducer";
import {setBaseCurrency} from '../../redux/reducers/mainReducer'
import {currenciesRatesArrayElement} from "../../redux/reducers/interfaces";
import {Select, Table} from 'antd';
import './exchangePage.scss'

const columns = [
  {
    title: "Currency Name",
    dataIndex: "name"
  },
  {
    title: "Currency Rate",
    dataIndex: "rate"
  },
];

const ExchangePage = () => {

  const dispatch = useTypedDispatch()

  const {listOfCurrencies, listOfRatesToBase, baseCurrency} = useTypedSelector(state => state.currencies)
  const { Option } = Select;

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
    <div className="exchange-page">
      <div className="exchange-page-currency-piker">
        <label>
          Choose base currency
        </label>
        <Select
          value={baseCurrency}
          onChange={(val) => {dispatch(setBaseCurrency(val))}}>
          {listOfCurrencies && listOfCurrencies.map((item: string) => {
            return <Option value={item} key={item}> {item} </Option>
          })
          }
        </Select>
      </div>
      <Table columns={columns} dataSource={listOfRatesToBase && listOfRatesToBase.map((item: currenciesRatesArrayElement) => {
        return {
          key: item[0],
          name: item[0],
          rate: item[1],
        }
      })} />
    </div>
  );
};

export default ExchangePage;
