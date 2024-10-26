import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cartItems);

  return (
    <Card className={classes.cart}>
      {cartItems.length > 0 && (
        <>
          <h2>Your Shopping Cart</h2>
          <ul>
            <CartItem
              item={{
                title: cartItems[0].title,
                quantity: cartItems[0].quantity,
                total: cartItems[0].quantity * cartItems[0].price,
                price: cartItems[0].price,
              }}
            />
          </ul>
        </>
      )}
    </Card>
  );
};

export default Cart;
