import { createSlice } from "@reduxjs/toolkit";


// Mutating all state directly with the help of IMMER
const cartSlice = createSlice({
  name: "cart",

  initialState: {
    //if there is a product in the local storage, add it to the state
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    currentCurrency: localStorage.getItem("selectedCurrency") || "USD",

  },

  reducers: {

    setCurrency(state, action) {
      if (state.currentCurrency){
        state.currentCurrency = action.payload;
      }
    },

    //Add to cart
    addToCart(state, action) {
      const productIndex = state.cartItems.findIndex(
        (productInd) => productInd.id === action.payload.id
      );

      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQty += 1;
      } else {
        const eachProductIncreament = { ...action.payload, cartQty: 1 };
        state.cartItems.push(eachProductIncreament);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      
    },
    increaseCartItem(state, action) {
      const productIndex = state.cartItems.findIndex(
        (productInd) => productInd.id === action.payload.id
      );

      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQty += 1;
      } else {
        const eachProductIncreament = { ...action.payload, cartQty: 1 };
        state.cartItems.push(eachProductIncreament);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      
    },

    //Delete from cart
    deleteCartItem(state, action) {
      const itemDeleted = state.cartItems.filter((cartItem) => {
        return cartItem.id !== action.payload.id;
      });
      state.cartItems = itemDeleted;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    //Decrease cart quantity
    decreaseCartQty(state, action) {
      const productIndex = state.cartItems.findIndex(
        (productInd) => productInd.id === action.payload.id
      );

      if (state.cartItems[productIndex].cartQty > 1) {
        state.cartItems[productIndex].cartQty -= 1;
      } else if (state.cartItems[productIndex].cartQty === 1) {
        const itemDecrease = state.cartItems.filter((cartItem) => {
          return cartItem.id !== action.payload.id;
        });
        state.cartItems = itemDecrease;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

   
  },
});

export const { addToCart , deleteCartItem, increaseCarQty ,  decreaseCartQty , setCurrency } = cartSlice.actions
export default cartSlice.reducer

 
