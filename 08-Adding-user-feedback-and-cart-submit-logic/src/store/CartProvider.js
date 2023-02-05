import React from 'react';
import CartContext from './cart-context';
import { useReducer } from 'react';


const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        
        //below .findIndex() finds index of item in array, and it should return true if thats the item we looking for and will be executed for all item in arr
        const existingCartItemIndex = state.items.findIndex(
          (item) => item.id === action.item.id
        );
        // below will only give value if item exist else will give null
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if(existingCartItem) {
          //item exist need to only change amount
          const updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount + action.item.amount
          };
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        }
        else{
          //item added for first time

          //below concat add new item to existing array and return nee array
           updatedItems = state.items.concat(action.item);

        }
        
        return {
            // returning new state snapshot
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    if(action.type === 'REMOVE'){
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if(existingItem.amount === 1){
        //  remove item entirely

        // below .filter returns an array of item for which it gets true
        updatedItems = state.items.filter(item => item.id !== action.id);
      }
      else{
        // decrease the quatity by 1
        const updatedItem = {...existingItem, amount: existingItem.amount-1};
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return{
        items: updatedItems,
        totalAmount: updatedTotalAmount
      };
    }

    if(action.type === 'CLEAR') {
      // return new state where card is empty
      return defaultCartState
    }

    return defaultCartState;
};


//in below goal of this component is to simply manage the card context data
//and provide that data to all component that want access to it.
const CartProvider = (props) => {
 
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
     
  const addItemToCardHandler = (item) => {
    dispatchCartAction({type: 'ADD', item: item});
  };

  const removeItemFromCardHandler = (id) => {
    dispatchCartAction({type: 'REMOVE', id: id});
  };

  const clearCartHandler = () => {
    dispatchCartAction({type: 'CLEAR'});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCardHandler,
    removeItem: removeItemFromCardHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
