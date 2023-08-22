import { createSlice } from "@reduxjs/toolkit";
import { updateCartPrice } from "../utils/updateCartPrice";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") as string)
  : { cartItems: [], shippingAddress: {}, paymentMethod: "UPI" };

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
      const itemExist = state.cartItems.find((x) => {
        console.log(itemToAdd._id);
        return x._id === itemToAdd._id;
      });
      // add qty to the existing item
      if (itemExist) {
        console.log(itemExist._id);
        state.cartItems = state.cartItems.map((x) => {
          return x._id === itemExist._id ? itemToAdd : x;
        });
        // add a new item if it is not in cart
      } else {
        state.cartItems = [...state.cartItems, itemToAdd];
      }
      //util fnc to add prices
      return updateCartPrice(state);
    },
    removeCartItems: (state, action) => {
      state.cartItems = state.cartItems.filter((product) => {
        return product._id !== action.payload;
      });
      return updateCartPrice(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCartPrice(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCartPrice(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCartPrice(state);
    },
  },
});

export const {
  addItemsToCart,
  removeCartItems,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
