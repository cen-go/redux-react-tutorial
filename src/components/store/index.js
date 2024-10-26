import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialCartState = {
  isCartShowing: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState:initialCartState,
  reducers: {
    showHideCart(state) {
      state.isCartShowing = !state.isCartShowing;
    },
    addItem(state, action) {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.title === action.payload.title
      );
      if (existingItemIndex === -1) {
        state.cartItems.push({
          title: action.payload.title,
          price: action.payload.price,
          quantity: 1,
        })
      } else {
        state.cartItems[existingItemIndex].quantity++;
      }
    },
    changeQuantity(state, action) {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.title === action.payload.title
      );
      state.cartItems[existingItemIndex].quantity += action.payload.amount;
      if (state.cartItems[existingItemIndex].quantity === 0) {
        state.cartItems.splice(existingItemIndex, 1);
        state.isCartShowing = false;
      }
    },
  }
})

const store = configureStore({
  reducer: cartSlice.reducer,
});

export const cartActions = cartSlice.actions;

export default store