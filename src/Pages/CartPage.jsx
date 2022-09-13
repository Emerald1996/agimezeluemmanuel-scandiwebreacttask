import React, { Component } from 'react'
import { connect } from 'react-redux'
import "../Styles/CartPage.css"
import { Link } from 'react-router-dom'
import { deleteCartItem , increaseCarQty , decreaseCartQty } from '../Redux/cartSlice'

export class CartPage extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       currency: this.props.currentCurrency
        
    }
  }


  componentDidMount() {
    document.title = "cart"

  }


  render() {
     const {currentCurrency} = this.props
     const {cart }= this.props

    const totalAmount = cart.cartItems.reduce((total, cartItem) => {
			cartItem.prices.forEach(({ currency, amount }) => {
				if (currency.label === this.state.currency) {
					total = total + amount * cartItem.cartQty;
				}
			});
			return total;
		}, 0);

  

    
    return (
      <div  className="cart-items-container">
        
        <>
       {cart.cartItems.length === 0 ?
        (
          <Link to="/all" className='cont-shopping'>
          <h1>Your cart is empty</h1>
          <h4>⬅Click To Start Shopping</h4>
        </Link>) :
       ( <h1 className='cart-update'> {`My Cart: (${cart.cartItems.length})`} {cart.cartItems.length > 1 ? 'items':'item'}</h1>
       
         )
        }

        <hr />

        {cart.cartItems.map((cartItem)=>{
           const currencyPrice = cartItem.prices.find((currency)=> currency.currency.label === this.state.currency)
       
          return (
            <div key={cartItem.id} >

         <div className="cart-items">

              <div className="cart-info">
                <h3>{cartItem.name}</h3>
                <p>{cartItem.brand}</p>
                <h4>{currentCurrency} {( currencyPrice.amount * cartItem.cartQty).toFixed(2)}</h4>

                <div className="cart-swatches">
                  {Object.entries(cartItem.attributes).map((attribute) => {
                    return (
                      <div key={attribute}>
                        <h4>{attribute[0]}: <span style={{color: 'white',background: "black", padding: "5px"}}>{attribute[1]}</span> </h4> 
                      </div>
                    );
                  })}
                  
                 
               </div>

               <div className="delete-btn">
                <button onClick={() => this.props.deleteCartItem((cartItem))}>🗑Remove</button>
               </div>

              </div>

              <div className="cart-item-qty">
                <button onClick={() => this.props.increaseCarQty((cartItem))}>+</button>
                <h5>{cartItem.cartQty}</h5>
                <button onClick={() => this.props.decreaseCartQty((cartItem))}>-</button>
              </div>

              <div className="cart-image">
                <img src={cartItem.image} alt={cartItem.image? "no image to display" : cartItem.name} 
                  className="slide-images" />
                
              </div>
            

          </div>
          <hr />
          

          </div>
        )})
        
      }
        </>
        

<div className="sum-up-container">
  <h3>Quantity: <span>{cart.cartItems.length}</span></h3>
  <h3>Total amount= {currentCurrency} {totalAmount.toFixed(2)}</h3>

 
     
  <button className="order">
    Order
  </button>
 </div>
</div>
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

export default connect(mapStateToProps , mapDispatchToProps())(CartPage)