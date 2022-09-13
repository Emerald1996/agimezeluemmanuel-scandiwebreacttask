import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../Redux/cartSlice'



export class ProductChoice extends Component {
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
        name: this.props.data.name,
        brand: this.props.data.brand,
        prices: this.props.data.prices,
        image: this.props.data.gallery[0],
        id: Math.floor(Math.random()*1000),//generated a random id
        cartQty: 1,
        attributes: {}
      }
      
      this.props.data.attributes.forEach(attribute => {
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
    const {data} = this.props

      const addToCartBtn = {
      width: '100%',
      padding: '18px',
      marginTop: '20px',
      backgroundColor: 'rgba(19, 238, 19,0.9)',
      borderRadius: '2rem',
      color: 'white',
      cursor: 'pointer',
      border: 'none'
    }

    const noStock = {
      color: 'rgb(255, 0, 0)',
      fontSize: '30px',
      textTransform: 'uppercase'
    }

    if(!data.inStock){
      return <h3 style={noStock}> Out of stock 😥</h3>
    }

    return (
      <>
      {data.attributes.map((attribute)=>{ 
        return (
          <div key={attribute.name} id={attribute.name} className="attribute_names">

            <div >
              <p><b style={{fontSize: "18px"}}>{attribute.name}</b>: <span style={{color:"white", background:"black", padding:"5px"}}><i>{this.state.product.attributes[attribute.name] || "An option is required, select below"}</i>
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
        (<button onClick={(e) => this.addProductToCart(e)} style={addToCartBtn} 
        
        >ADD TO CART</button>)
      }
        
   
      </>
    )
  }
}


const mapDispatchToProps = ()=>{
        return (
          {addToCart}
          )
        }

export default connect(null, mapDispatchToProps())(ProductChoice)