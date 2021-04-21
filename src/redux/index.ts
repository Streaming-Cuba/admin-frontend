import store from "./store";
import {TypedUseSelectorHook, useSelector} from "react-redux";

// Infer the `RootState` and `AppDispatch` types from the redux itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export {
    store
};
