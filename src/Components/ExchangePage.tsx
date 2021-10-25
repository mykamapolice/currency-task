import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useTypedDispatch, useTypedSelector} from "../hooks/redux-hooks/redux-hooks";
import {getBaseCurrency} from "../redux/reducers/mainReducer";

const ExchangePage = () => {

  const [baseCurrency, setBaseCurrency] = useState<string>('USD')

  const dispatch = useTypedDispatch()
  const listOfRatesToBase = useTypedSelector(state => state.currencies.listOfRatesToBase)

  useEffect(() => {
    baseCurrency && dispatch(getBaseCurrency({base : baseCurrency}))
  }, [baseCurrency])

  const { register, handleSubmit } = useForm();

  return (
    <div>
      <form>
        <label>
          Choose base currency
        </label>
        <select {...register("currency")} onChange={(e) => {
          setBaseCurrency(e.target.value)}}>
          {listOfRatesToBase && Object.entries(listOfRatesToBase).map((item: any) => {
            return <option value={item[0]}>
                      {item[0]}
                    </option>
          })}
        </select>
      </form>
      {listOfRatesToBase && Object.entries(listOfRatesToBase).map((item: any) => {
        return <div>
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
