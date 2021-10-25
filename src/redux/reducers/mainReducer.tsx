import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'

export const getCurrenciesRates = createAsyncThunk(
  'currencies/getCurrenciesRates',
  async (params, thunkAPI) => {
    try {
      const response = await axios({
        url: 'v2/latest',
        method: 'get',
      })
      return response.data
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e)
    }
  },
)

export const getBaseCurrency = createAsyncThunk<
  any,
  any,
  {
    rejectValue: AxiosResponse
  }
  >('currencies/getBaseCurrency',
  async (props : any, thunkAPI) => {
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

const currencyState: any = {
  baseCurrency: '',
  listOfRates: [],
  listOfRatesToBase: [],
  error: ''
}

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: currencyState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrenciesRates.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(getCurrenciesRates.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false
        state.listOfRatesToBase = action.payload
      })
      .addCase(getCurrenciesRates.rejected, (state) => {
        state.loading = false
        state.error = ''
      })
      .addCase(getBaseCurrency.fulfilled, (state, { payload }) => {
        state.listOfRatesToBase = payload.data
      })
      .addCase(getBaseCurrency.rejected, (state, action) => {
      })
  },
})

export default currenciesSlice.reducer
