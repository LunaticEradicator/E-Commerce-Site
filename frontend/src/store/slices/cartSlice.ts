import { createSlice } from "@reduxjs/toolkit";
import { cartUtilsPrices } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") as string)
  : { cart: [], saveShippingAddress: {}, payment: "Paypal" };

// const initialState = JSON.parse(localStorage.getItem("cart")) || {
//   cartItems: [],
// };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // state means the current state
    // action is the upcoming payload of it
    addItemsToCart: (state, action) => {
      const itemToAdd = action.payload;
      console.log(itemToAdd);
      //check if the product is already added in cart
      const itemExist = state.cart.find((x) => {
        console.log(itemToAdd._id);
        return x._id === itemToAdd._id;
      });
      // add qty to the existing item
      if (itemExist) {
        console.log(itemExist._id);
        state.cart = state.cart.map((x) => {
          return x._id === itemExist._id ? itemToAdd : x;
        });
        // add a new item if it is not in cart
      } else {
        state.cart = [...state.cart, itemToAdd];
      }
      //util fnc to add prices
      return cartUtilsPrices(state);
    },
    removeCartItems: (state, action) => {
      state.cart = state.cart.filter((product) => {
        return product._id !== action.payload;
      });
      return cartUtilsPrices(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingPrice = action.payload;
      return cartUtilsPrices(state);
    },
  },
});

export const { addItemsToCart, removeCartItems } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
