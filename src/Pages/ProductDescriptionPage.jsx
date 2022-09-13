import React, { Component } from 'react'
import ProductChoice from '../Components/ProductChoice'
import "../Styles/ProductDescriptionPage.css"
import { connect } from 'react-redux'



export class ProductDescriptionPage extends Component {

   constructor(props) {
   super(props)
 
   this.state = {
      imageArrIndex: 0,
      hideModal: false,
   }
 }

 imageOnclick = (index) =>{
    this.setState({imageArrIndex: index})
  }

  hideModal = () => {
    this.setState({hideModal: !this.state.hideModal})
  }

  render() {
  const product = this.props
  const {currentCurrency} = this.props
  const {price} = this.props
     return (
          <>
          
            
            {!this.state.hideModal &&<div className="outer-modal">

             <div className="modal-container">

                  <h1 onClick={()=>this.hideModal()} className="modalBtn">❌</h1>

                <div className="product_desc_page">
                  <div className='product_image'>
                    <div className='small_image'>
                      {product.data.gallery.map((img, index)=>{
                        return <img src={img} key={img}  alt={img}  onClick={()=>this.imageOnclick(index)}/>
                      })}
                    </div>
                    <img src={product.data.gallery[this.state.imageArrIndex]} alt={product.data.name}
                    className="big-image" />
                    
                </div>

                <div className="product_info">
                    <h1>{product.data.name}</h1>
                    <h2>Price: {currentCurrency} {price.amount}</h2>
                    <h2>Brand: {product.data.brand}</h2>
                    <h5>Description: {product.data.description}</h5>
                    <ProductChoice data={product.data} key={product.id} id={product.id}/> 
                </div>

            </div>

             </div>
            
            </div>}
            

          </>
         )
  }
}

const mapStateToProps = (state) => {
  return {
    currentCurrency: state.cart.currentCurrency,
  }
}

export default connect(mapStateToProps)(ProductDescriptionPage)