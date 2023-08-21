const addDecimals = (num: number) => {
  return (Math.floor(num * 100) / 100).toFixed(2);
};

const updateCartPrice = (state) => {
  // Calculate Price [Item Price, Shipping Price, Tax Price, Total Price]
  //? Item Price
  state.itemsPrice = addDecimals(
    state.cart.reduce((acc: number, item) => {
      console.log(item);
      return Number(acc + item.price * item.qty);
    }, 0)
  );
  //? Shipping Price
  //  if price is not higher than 1000 rupees add 120 rupees as fee
  state.shippingPrice = addDecimals(state.itemsPrice > 1000 ? 0 : 120);
  //? Tax Price
  // add 5% tax
  state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));
  // ? Total Price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  //save the above to localStorage
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};

export { addDecimals, updateCartPrice };
