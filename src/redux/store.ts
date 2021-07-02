import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "./reducers/layout";
import thunk from "redux-thunk";
import accountReducer from "./reducers/account";
import metricsReducer from "./reducers/metrics"

const store = configureStore({
  reducer: {
    layout: layoutReducer,
    account: accountReducer,
    metrics: metricsReducer
  },
  middleware: [thunk],
  devTools: process.env.NODE_ENV === "development",
});

export const getToken = (): string => {
  return store.getState().account.token || ""
}

export default store;
