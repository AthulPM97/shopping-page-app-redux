import classes from './CartButton.module.css';
import { cartActions } from '../../store/cart';
import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {

  //store
  const dispatch = useDispatch();
  const totalQuantity = useSelector(state => state.cart.items).length;

  //handlers
  const showCartHandler = () => {
    dispatch(cartActions.setShowCart());
  };

  return (
    <button className={classes.button} onClick={showCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
