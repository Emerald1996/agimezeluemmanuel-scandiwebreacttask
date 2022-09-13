import React, { Component } from 'react'
import ProductListItem from './ProductListItem';
import { connect } from 'react-redux';
import "../Styles/ProductList.css"


export class ProductList extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       currency: this.props.currentCurrency
    }
  }
  render() {
    const products = this.props.products;
    const categoryName = this.props.category;
    return (
      <div>
        <ul className='product_list'>
        {products.map((product) => {
          const currencyPrice = product.prices.find((currency)=> currency.currency.label === this.state.currency)
          return (
          
          <ProductListItem
            key={product.id}
            product={product}
            price={currencyPrice}
            category={categoryName || product.category}
          />
        )})}
      </ul>
      </div>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentCurrency: state.cart.currentCurrency,
  }
}

export default connect(mapStateToProps)(ProductList)