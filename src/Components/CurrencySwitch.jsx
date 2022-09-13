import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setCurrency } from '../Redux/cartSlice';
import "../Styles/CurrencySwitch.css"

export class CurrencySwitch extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       currency: this.props.currentCurrency
    }
  }
  componentDidMount(){
    this.setState({currency: this.props.currentCurrency})
  }
 

  currencyOnclick(event) {
		this.setState({currency: event.target.value})
    localStorage.setItem("selectedCurrency", event.target.value);
    this.props.setCurrency(event.target.value);
	};

  render() {
 
    return (
      <div className='currency'>
       <select onChange={(event)=>this.currencyOnclick(event)}>
        <option value="USD">$</option>
        <option value="GBP">£</option>
        <option value="AUD">A$</option>
        <option value="JPY">¥</option>
        <option value="RUB">₽</option>
       </select>
      </div>
    )
  }
}
const mapStateToProps = state => ({
	currentCurrency: state.cart.currentCurrency,
});
const mapDispatchToProps =()=>{
  return({
    setCurrency
  })
}

export default connect(mapStateToProps,mapDispatchToProps())(CurrencySwitch)