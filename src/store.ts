import { configureStore } from '@reduxjs/toolkit'
import currenciesSlice from './redux/reducers/mainReducer'

export const store = configureStore({
  reducer: {
    currencies: currenciesSlice
  },
})

export type rootState = ReturnType<typeof store.getState>

export type appDispatch = typeof store.dispatch
