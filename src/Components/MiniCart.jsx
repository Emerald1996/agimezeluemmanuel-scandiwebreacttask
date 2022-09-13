import React, { Component } from 'react'
import { increaseCarQty , deleteCartItem, decreaseCartQty} from '../Redux/cartSlice'
import { connect } from 'react-redux'
import "../Styles/MiniCart.css"
import { Link } from 'react-router-dom'

export class MiniCart extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       toggle: this.props.closecart,
       currency: this.props.currentCurrency
    }
  }
  minicartclose = () =>{
    this.setState({toggle: !this.state.toggle})
  }
  
  render() {
  
    const {cartItems,currentCurrency} = this.props
    // console.log("cartItems", cartItems)
    
    const totalAmount = cartItems.reduce((total, cartItem) => {
			cartItem.prices.forEach(({ currency, amount }) => {
				if (currency.label === this.state.currency) {
					total = total + amount * cartItem.cartQty;
				}
			});
			return total;
		}, 0);

    
 
   
    return (
      <>
      <div className="toggle-cart-body" onClick={()=>this.minicartclose()}>

        <div className='toggle-cart'>
          
            <h1 className="mini-cart-heading">My cart: {`${cartItems.length}`} {cartItems.length > 1 ? 'items':'item'}</h1>

          <div className="mini-cart-page">
            {cartItems.map((cartItem) => {
               const currencyPrice = cartItem.prices.find((currency)=> currency.currency.label === this.state.currency)
              return <>
              <div className="mini-cart-info" key={cartItem.id}>
                <h3>{cartItem.name}</h3>
                <p>{cartItem.brand}</p>
                <h4>{currentCurrency} { ( currencyPrice.amount * cartItem.cartQty).toFixed(2)}</h4>

                <div className="mini-cart-swatches">
                  
                  {Object.entries(cartItem.attributes).map((attribute) => {
                    return (
                      <div key={attribute}>
                        <h4>{attribute[0]}: <span style={{color: 'white',background: "black", padding: "5px"}}>{attribute[1]}</span> </h4> 
                      </div>
                    );
                  })}
                </div>
              </div>


                <div className="mini-cart-item-qty">
                  <button onClick={() => this.props.increaseCarQty((cartItem))}>+</button>
                    <h5>{cartItem.cartQty}</h5>
                  <button onClick={() => this.props.decreaseCartQty((cartItem))}>-</button>
                </div>

                <div className="mini-cart-image">
                  <div className="mini-cart-image-display">
                      <img src={cartItem.image} alt={cartItem.name} 
                      className="mini-cart-images" />
                    </div>
                </div>

              </>
            })}
          </div>
            
          <div className="mini-cart-total">
            <h3>Total:</h3>
            <h3>{currentCurrency} {totalAmount.toFixed(2)}</h3>
          </div>

          <div className="mini-cart-btn">
              <button onClick={()=>this.minicartclose()}>
                <Link to="/cart" className='cart-link' viewcart={cartItems}>
                  view cart
                </Link>
              </button>
            <button>
               <Link to="/checkout" className='cart-link'>
                  check out
                </Link>
            </button>
          </div>
        </div>
      </div>
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

const mapDispatchToProps = () => {
  return {
    increaseCarQty,
    deleteCartItem,
    decreaseCartQty,
  }
}

export default connect(mapStateToProps , mapDispatchToProps())(MiniCart)