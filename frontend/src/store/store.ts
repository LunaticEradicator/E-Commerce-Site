import { configureStore } from "@reduxjs/toolkit";
import { rootApi } from "./apis/rootApi.ts";

const store = configureStore({
  // main reducer which store states
  reducer: {
    // stateName:miniReducer[slice].reducer
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
  devTools: true,
});

export { store };
