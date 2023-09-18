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
      //check if the product is already added in cart
      const itemExist = state.cartItems.find((x: any) => {
        return x._id === itemToAdd._id;
      });
      if (itemExist) {
        // add qty to the existing item
        state.cartItems = state.cartItems.map((x: any) => {
          return x._id === itemExist._id ? itemToAdd : x;
        });
      } else {
        // add a new item if it is not in cart
        state.cartItems = [...state.cartItems, itemToAdd];
      }
      //util fnc to add prices
      return updateCartPrice(state);
    },
    removeCartItems: (state, action) => {
      state.cartItems = state.cartItems.filter((product: any) => {
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
    clearCartItems: (state) => {
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
