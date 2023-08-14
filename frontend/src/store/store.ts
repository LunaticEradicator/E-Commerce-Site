import { configureStore } from "@reduxjs/toolkit";
import { rootApi } from "./apis/rootApi.ts";
import {
  cartReducer,
  addItemsToCart,
  removeCartItems,
} from "./slices/cartSlice.ts";

import { authReducer, setCredentials } from "./slices/authSlice.ts";

const store = configureStore({
  // main reducer which store states
  reducer: {
    // stateName:miniReducer[slice].reducer
    [rootApi.reducerPath]: rootApi.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
  devTools: true,
});

export { store, cartReducer, addItemsToCart, removeCartItems };
export { authReducer, setCredentials };
