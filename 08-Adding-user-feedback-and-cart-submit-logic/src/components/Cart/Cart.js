import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount =`$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  // no issue to make it async function as its not a effect function but a regular function
  const submitOrderHandler = async (userData) => {

    setIsSubmitting(true);

    const url = 'https://react-http-43b44-default-rtdb.firebaseio.com/orders.json';
    // for POST req we need to pass configuration obj, not needed for GET req
    await fetch(url, {
      method: 'POST',
      // need to send/pass json data 
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);

    // clears cart once we are done submitting
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
       {cartCtx.items.map((item) => (
       <CartItem
         key={item.id}
         name={item.name}
         amount={item.amount}
         price={item.price}
        //.bind() reconfigures the argument the function will receive when executed
         onRemove={cartItemRemoveHandler.bind(null, item.id)}
         onAdd={cartItemAddHandler.bind(null, item)}
         />
       ))}
    </ul>);

    const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
      {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
  );

  const cardModalContent = (<React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
      {!isCheckout && modalActions}
    </React.Fragment>);

  const isSubmittingModalContent =   <p>Sending order data...</p>

  const didSubmitModalContent = 
     <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes['button']} onClick={props.onClose}>Close</button>
    </div>
     </React.Fragment>

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cardModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
