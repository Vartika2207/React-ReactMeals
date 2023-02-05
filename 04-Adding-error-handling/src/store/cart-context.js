import React from 'react';

const CartContext = React.createContext({
    // initializing data for auto-completion purpose, not for use
    items: [],
    totalAmount: 0,
    // addItem function receives item that should be added
    addItem: (item) => {},
    //removeItem functions takes id to identify items to be removed
    removeItem: (id) => {}
});

// export default function cartContextProvider() {
//   return (
//     <div>cart-context</div>
//   );
// };


export default CartContext;
