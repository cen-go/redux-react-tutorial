import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cartItems);
  const totalPrice = cartItems.reduce(
    (total, item) => (total += item.quantity * item.price),
    0
  );

  return (
    <Card className={classes.cart}>
      {cartItems.length > 0 && (
        <>
          <h2>Your Shopping Cart</h2>
          <ul>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={{
                  title: item.title,
                  quantity: item.quantity,
                  total: item.quantity * item.price,
                  price: item.price,
                }}
              />
            ))}
          </ul>
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        </>
      )}
    </Card>
  );
};

export default Cart;
