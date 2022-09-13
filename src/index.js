import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client/core";

import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux'
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './Redux/cartSlice';


const store = configureStore({
  reducer: {
    cart: cartSlice
  },
  
})

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
);


