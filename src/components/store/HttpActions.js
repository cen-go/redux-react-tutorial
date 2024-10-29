import { cartActions } from '../store';

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

export const fetchCartData = () => {
  return async (dispatch) => {
    async function sendHttpRequest() {      
        const response = await fetch(
          "https://udemy-react-9014b-default-rtdb.europe-west1.firebasedatabase.app/redux-cart.json"
        );
        if (!response.ok) {
          throw new Error("Could't fetch cart data!");
        }
        const resData = await response.json();
        return resData;      
    }

    try {
      const cartData = await sendHttpRequest();      
      dispatch(cartActions.loadCart(cartData));
    } catch (error) {
      dispatch(
        cartActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};