import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../Redux/cartSlice'
import cart from "../Assets/cart.svg"
import "../Styles/ProductListItem.css"

export class ProductListAttribute extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         product: {
        attributes: {},
      }
      }
    }

    selectAttr = () => {
      const product = {
        name: this.props.product.name,
        brand: this.props.product.brand,
        prices: this.props.product.prices,
        image: this.props.product.gallery[0],
        id: Math.floor(Math.random()*1000),
        cartQty: 1,
        attributes: {}
      }
      
      this.props.product.attributes.forEach(attribute => {
        product.attributes[attribute.name] = ''
      });
      
      this.setState({
        product: product
      })
    }

    componentDidMount(){
    document.title = 'product || add to cart'
    this.selectAttr()
  }
  
  addProductToCart(e){
    e.preventDefault()
    this.props.addToCart(this.state.product)
    this.handleAttr()
    this.selectAttr()

  }
  
  handleAttr= (attributeName, itemID) => {
    this.setState({
      product: {
        ...this.state.product,
        
        attributes: {
          ...this.state.product.attributes,
          [attributeName]: itemID
          
        }
      }
    })
    
  }
  render() {

    const {product} = this.props
    return (
       <>
      {product.attributes.map((attribute)=>{ 
        return (
          <div key={attribute.name} id={attribute.name} className="attribute_names">

            <div >
              <p><b style={{fontSize: "16px"}}>{attribute.name}</b>: <span style={{color:"white", background:"black", padding:"5px"}}><b>{this.state.product.attributes[attribute.name] || "An option is required, select below"}</b>
               </span></p>  
            </div>

            {attribute.items.map((item)=>{
              return (
                <button
                onClick={() => this.handleAttr(attribute.name, item.id )}
                key={item.id} 
                style={{backgroundColor: item.value, border: 'none', padding: '8px 15px' , margin: '3px' , cursor: 'pointer'}}
                
                >
                  {attribute.type === "swatch" ? "" : item.displayValue}
                </button>
              )
            })}
          </div>

        )
      })}
      
      {   
        !Object.values(this.state.product.attributes).some(selection=> selection === "") &&  
        (
            <div className="cart-btn">
                <img src={cart} alt="cart-btn" className='btn-cart' onClick={(e) => this.addProductToCart(e)}/>
            </div>
        )
      }
        
   
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currentCurrency: state.cart.currentCurrency,
  }
}

const mapDispatchToProps = ()=>{
        return (
          {addToCart}
          )
        }

export default connect(mapStateToProps, mapDispatchToProps())(ProductListAttribute)