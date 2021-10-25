export interface ICurrencyState {
  baseCurrency: string
  listOfCurrencies: string[]
  listOfRatesToBase: currenciesRatesArray
  error: string
  loading: boolean
  quantity: string | null
}

export type currenciesRatesArrayElement = [string, number]

export type currenciesRatesArray = currenciesRatesArrayElement[]
