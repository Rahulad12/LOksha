export const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

export const updateCart = (state) =>{
    // Calculate items price
    state.itemPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // Calculate shipping price
      state.shippingPrice = addDecimal(state.itemPrice > 100 ? 0 : 10);

      // Calculate tax price
      state.taxPrice = addDecimal(0.15 * state.itemPrice);

      // Calculate total price
      state.totalPrice = addDecimal(
        Number(state.itemPrice) +
          Number(state.shippingPrice) +
          Number(state.taxPrice)
      );

      localStorage.setItem("cart", JSON.stringify(state));
};