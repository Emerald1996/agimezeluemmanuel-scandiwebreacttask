import React, { Component } from 'react'
import ProductDescriptionPage from '../Pages/ProductDescriptionPage';
import "../Styles/ProductListItem.css"
import ProductListAttribute from './ProductListAttribute';
import { connect } from 'react-redux';




export class ProductListItem extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       selected: null
    }
  }
  render() {
    const {product} = this.props
    const {currentCurrency} = this.props
    const {price} = this.props
    // console.log("price", price)
    

    const availabilityStock = product.inStock ? "item_list" : 'no_item'
    const noStock = !product.inStock ? 'no_stock': 'item_list'

    
    
    return (
      <>
      
        <div className={availabilityStock}>
          <div className='products'>
            <img
                onClick={(e)=>{ this.setState({selected: product.id})}}
                src={product.gallery[0]}
                title={product.name}
                alt={product.name}
                width="350px"
                height="200px"
              />
              <hr />
            {!product.inStock && (
              <p className={noStock}>Out of stock</p>
            )}
            <div className='product_tag'>
              <div>
                <h3>{product.name}</h3>
                <p>{currentCurrency} {price.amount}</p>
              </div>
     
            </div>
            {product.inStock && 
            <div className="attribute-list">
              <ProductListAttribute product={product} />
            </div>
            }
          </div>
         </div>
        <div>
        </div>
          {this.state.selected && 
           <ProductDescriptionPage productId ={this.state.selected} data={product} id={product.id} price={price}/>}
      </>

    )
  }
}



const mapStateToProps = (state) => {
  return {
    currentCurrency: state.cart.currentCurrency,
  }
}

export default connect(mapStateToProps)(ProductListItem)

