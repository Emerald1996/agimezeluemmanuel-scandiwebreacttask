import React, { Component } from 'react'
import ProductsList from "../Components/ProductList"


export class CategoryPage extends Component {
  componentDidMount() {
    document.title = 'Categories';
  }
  render() {
    const products = this.props.products;
    const categoryName = this.props.name;
    return (
      <main>
        {categoryName && 
            <h1 style={{textAlign: 'center',WebkitTextStroke: "2px green", color: 'white'}}>{categoryName.toUpperCase()}</h1>
          }

          {products && (
            <ProductsList products={products} />
          )}
 
      </main>
    )
  }
}

export default CategoryPage