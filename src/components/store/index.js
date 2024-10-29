import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialCartState = {
  isCartShowing: false,
  cartItems: [],
  notification: null,
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
          id: action.payload.id,
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

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      cartActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data.",
      })
    );
    
    try {
      const response = await fetch(
        "https://udemy-react-9014b-default-rtdb.europe-west1.firebasedatabase.app/redux-cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
      dispatch(
        cartActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart data is sent successfully",
        })
      );
    } catch (error) {
      dispatch(
        cartActions.showNotification({
          status: "error",
          title: "Error!",
          message: "sending cart data failed!",
        })
      );
    }
  };
};

export default store