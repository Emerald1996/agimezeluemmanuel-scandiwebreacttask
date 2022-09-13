import React, { Component } from 'react'
import Navigation from './Navigation'
import Logo from "../Assets/logo.svg"
import Cart from "../Assets/cart.svg"
import CurrencySwitch from './CurrencySwitch'
import "../Styles/Navbar.css"
import homeLogo from "../Assets/homebutton.svg"
import MiniCart from './MiniCart'
import { connect } from 'react-redux'



export class Navbar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isCartOpen: false
    }
  }

  showCart(){
    this.setState({isCartOpen: !this.state.isCartOpen})
  }
  render() {
    const categoryNames = this.props.categories
    const cart = this.props.cart
    
  
    return (
      <div className='navbar'>
        <div className='left-nav'>
            
             <a href="/"> <img src={homeLogo} alt={homeLogo} className="home-btn"/></a>
            
              
            <Navigation categories={ categoryNames} />
        </div>
        <img src={Logo} alt={Logo}/>

        <div className='right-nav'>
            <CurrencySwitch/>
             <img src={Cart} alt={Cart} className='cart' 
             onClick={()=>this.showCart()}/> <span className='cart-num'>{cart.cartItems.length}</span>
             {this.state.isCartOpen && <MiniCart cartItems={cart.cartItems} closecart={this.state.isCartOpen}/>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  }
}



export default connect( mapStateToProps)(Navbar)