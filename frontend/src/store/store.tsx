import { combineReducers, configureStore } from "@reduxjs/toolkit";
import walletReducer from "./walletSlice"
import exchangeReducer from "./exchangeSlice"

export const store = configureStore({
    reducer: combineReducers({walletReducer, exchangeReducer}),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>