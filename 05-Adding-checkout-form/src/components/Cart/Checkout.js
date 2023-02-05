// import React from 'react';
import classes from './Checkout.module.css';
import { useRef } from 'react';

const Checkout = (props) => {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    // we get event automatically bcz its bind to onSubmit event
  const confirmHandler = (event) => {
    event.preventDefault();

    // below values will be used for validation in later modules
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
  };

  return (
    <form onSubmit={confirmHandler} className={classes.form}>
        <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameInputRef}/>
        </div>
        <div className={classes.control}>
            <label htmlFor='street'>Street</label>
            <input type='text' id='street' ref={streetInputRef}/>
        </div>
        <div className={classes.control}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' ref={postalCodeInputRef}/>
        </div>
        <div className={classes.control}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef}/>
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit}>Confirm</button>
        </div>
    </form>
  );
};


export default Checkout;