import { configureStore } from '@reduxjs/toolkit'
import RootReducer from "./reducer"

export default configureStore({
  reducer: RootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
      }
    })
})