import { configureStore } from '@reduxjs/toolkit'
import account from './reducers/account'
import vehicle from './reducers/vehicle'
import station from './reducers/station'
import { Provider } from 'react-redux'

export const store = configureStore({
  reducer: {
    account,
    vehicle,
    station,
  }
})

export const StoreProvider = ({ children }) =>
  <Provider store={store}> {children} </Provider>