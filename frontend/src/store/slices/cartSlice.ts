import { createSlice } from "@reduxjs/toolkit";
import { updateCartPrice } from "../utils/updateCartPrice";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") as string)
  : { cart: [], shippingAddress: {}, payment: "Paypal" };

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
      return updateCartPrice(state);
    },
    removeCartItems: (state, action) => {
      state.cart = state.cart.filter((product) => {
        return product._id !== action.payload;
      });
      return updateCartPrice(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCartPrice(state);
    },
    savePaymentMethod: (state, action) => {
      state.payment = action.payload;
      return updateCartPrice(state);
    },
    clearCartItems: (state, action) => {
      state.cart = [];
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
