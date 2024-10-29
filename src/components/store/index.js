import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialCartState = {
  isCartShowing: false,
  cartItems: [],
  notification: null,
  isCartChanged: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState:initialCartState,
  reducers: {
    showHideCart(state) {
      state.isCartShowing = !state.isCartShowing;
    },
    loadCart(state, action) {
      state.cartItems = action.payload || [];
    },
    addItem(state, action) {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.title === action.payload.title
      );
      if (existingItemIndex === -1) {
        state.cartItems.push({
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          quantity: 1,
        })
        state.isCartChanged = true;
      } else {
        state.cartItems[existingItemIndex].quantity++;
        state.isCartChanged = true;
      }
    },
    changeQuantity(state, action) {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.title === action.payload.title
      );
      state.cartItems[existingItemIndex].quantity += action.payload.amount;
      state.isCartChanged = true;
      if (state.cartItems[existingItemIndex].quantity === 0) {
        state.cartItems.splice(existingItemIndex, 1);
        if (state.cartItems.length === 0) {
          state.isCartShowing = false;
        }
        state.isCartChanged = true;
      }
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  }
})

const store = configureStore({
  reducer: cartSlice.reducer,
});

export const cartActions = cartSlice.actions;

export default store