import { createSlice } from "@reduxjs/toolkit";
import { cartUtilsPrices } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") as string)
  : { cartItems: [] };

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
      const item = action.payload;
      console.log(item);
      //check if the product is already added in cart
      const itemExist = state.cartItems.find((x) => {
        console.log(item._id);
        return x._id === item._id;
      });
      // add qty to the existing item
      if (itemExist) {
        console.log(itemExist._id);
        state.cartItems = state.cartItems.map((x) => {
          return x._id === itemExist._id ? item : x;
        });
        // add a new item if it is not in cart
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      //util fnc to add prices
      return cartUtilsPrices(state);
    },
    removeCartItems: (state, action) => {
      state.cartItems = state.cartItems.filter((product) => {
        return product._id !== action.payload;
      });
      return cartUtilsPrices(state);
    },
  },
});

export const { addItemsToCart, removeCartItems } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
