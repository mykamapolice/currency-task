import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import {ICurrencyState} from "./interfaces";

export const getCurrenciesRates = createAsyncThunk<
  any,
  any,
  {
    rejectValue: AxiosResponse
  }
  >(
  'currencies/getCurrenciesRates',
  async (_, thunkAPI) => {
    try {
      const response = await axios({
        url: 'v2/latest?apikey=01cbaac0-34e8-11ec-b7ff-112de751d5c7',
        method: 'get',
      })
      return response.data
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e)
    }
  },
)

export const getBaseCurrenciesRates = createAsyncThunk<
  any,
  { base: string },
  {
    rejectValue: AxiosResponse
  }
  >('currencies/getBaseCurrenciesRates',
  async (props , thunkAPI) => {
    const {base} = props
    try {
      const response = await axios({
        url: `v2/latest?apikey=01cbaac0-34e8-11ec-b7ff-112de751d5c7&base_currency=${base}`,
        method: 'get',
      })
      return response.data
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e)
    }
  })

const currencyState: ICurrencyState = {
  baseCurrency: '',
  listOfCurrencies: [],
  listOfRatesToBase: [],
  error: '',
  loading: false,
  quantity: null
}

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: currencyState,
  reducers: {
    setBaseCurrency(state, action) {
      state.baseCurrency = action.payload
      localStorage.setItem('currency', action.payload)
    },
    setQuantity(state, action) {
      state.quantity = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrenciesRates.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(getCurrenciesRates.fulfilled, (state, {payload}) => {
        state.loading = false
        state.listOfCurrencies = Object.entries(payload.data).map(item => item[0])
        state.listOfCurrencies.push('USD')
      })
      .addCase(getCurrenciesRates.rejected, (state) => {
        state.loading = false
        state.error = ''
      })
      .addCase(getBaseCurrenciesRates.fulfilled, (state, { payload }) => {
        state.listOfRatesToBase = Object.entries(payload.data)
      })
      .addCase(getBaseCurrenciesRates.rejected, (state, action) => {
      })
  },
})

export default currenciesSlice.reducer
export const {setBaseCurrency, setQuantity} = currenciesSlice.actions
