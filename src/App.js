import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from "./components/UI/Notification";
import { sendCartData } from './components/store';

let isInitialCartData = true;

function App() {
  const dispatch = useDispatch();
  const isCartShowing = useSelector((state) => state.isCartShowing);
  const cartItems = useSelector((state) => state.cartItems);
  const notificationStatus = useSelector(state => state.notification);
  
  useEffect(() => {
    
    if (isInitialCartData) {
      isInitialCartData = false;
      return;
    }

    dispatch(sendCartData(cartItems));
  }, [cartItems, dispatch]);

  return (
    <>
      {notificationStatus && (
        <Notification
          status={notificationStatus.status}
          title={notificationStatus.title}
          message={notificationStatus.message}
        />
      )}
      <Layout>
        {isCartShowing && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
