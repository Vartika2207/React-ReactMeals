import React, { useContext } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
  };


  return (
    <li className={classes.meal}>
        {/* this .name can be other naming (like val), but should be similar to whats passed from AvailableMeal */}
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{`$${props.price.toFixed(2)}`}</div>
        </div>
        <div> 
            <MealItemForm id={props.id} onAddToCart={addToCartHandler}/>
        </div>
    </li>
  )
};

export default MealItem;
