import { useDispatch, useSelector } from "react-redux";

import classes from './CartButton.module.css';
import { cartActions} from "../store/index";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);

  const cartItemCount = cartItems.reduce((total, item) => total += item.quantity,0);

  const handleShowCart = () => {
    dispatch(cartActions.showHideCart());
  };
  return (
    <button className={classes.button} onClick={handleShowCart} disabled={cartItems.length < 1}>
      <span>My Cart</span>
      {cartItemCount > 0 && <span className={classes.badge}>{cartItemCount}</span>}      
    </button>
  );
};

export default CartButton;
