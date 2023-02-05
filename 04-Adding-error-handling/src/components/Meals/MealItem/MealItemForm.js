import React, { useState, useRef } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = (props) => {

  // below to state to check if form valid or not
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  
  const submitHandler = (event) => {
    event.preventDefault();
    console.log("prevent default executed")

    // this below aIRf.crrent holds the ref and .value will give value which will always be a string
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form}  onSubmit={submitHandler}>
        {/*{{}} bcz: inner bracket is to evaluate js expression passed in as a value
        and other bracket bcz its js object*/}
        <Input 
        // this is input component, hence we need to specify in Input.js about ref using forwardRefs
            ref={amountInputRef}
            label="Amount" 
            input={{
              id:'amount_' + props.id,
              type:'number',
              min:'1',
              max:'6',
              step:'1',
              defaultValue:'1'
        }}/>
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
