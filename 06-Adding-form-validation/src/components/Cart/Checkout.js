// import React from 'react';
import classes from './Checkout.module.css';
import { useRef, useState } from 'react';


const isEmpty = (value) => value.trim() === '';

const isFiveChars = (value) => value.trim().length === 5;
 

const Checkout = (props) => {
    
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });

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

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
        postalCode: enteredPostalCodeIsValid
    });

    const formIsValid = enteredNameIsValid && enteredCityIsValid && enteredStreetIsValid && enteredPostalCodeIsValid;

    if(!formIsValid) {
        return;
    }

    //submit cart
  };

  // template literal to inject control class into string 
  const nameControlClasses = `
    ${classes.control} 
    ${formInputsValidity.name ? '' : classes.invalid}
  `;
  const streetControlClasses = `
    ${classes.control} 
    ${formInputsValidity.street ? '' : classes.invalid}
  `;
  const cityControlClasses = `
    ${classes.control} 
    ${formInputsValidity.city ? '' : classes.invalid}
  `;
  const postalCodeControlClasses = `
    ${classes.control} 
    ${formInputsValidity.postalCode ? '' : classes.invalid}
  `;

  return (
    <form onSubmit={confirmHandler} className={classes.form}>
        <div className={nameControlClasses}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameInputRef}/>
            {!formInputsValidity.name && <p className={classes.invalid}>Please enter valid name</p>}
        </div>
        <div className={streetControlClasses}>
            <label htmlFor='street'>Street</label>
            <input type='text' id='street' ref={streetInputRef}/>
            {!formInputsValidity.street && <p>Please enter valid street</p>}
        </div>
        <div className={postalCodeControlClasses}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' ref={postalCodeInputRef}/>
            {!formInputsValidity.postalCode && <p>Please enter valid postal code (5 characters)</p>}
        </div>
        <div className={cityControlClasses}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef}/>
            {!formInputsValidity.city && <p>Please enter valid city</p>}
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit}>Confirm</button>
        </div>
    </form>
  );
};


export default Checkout;