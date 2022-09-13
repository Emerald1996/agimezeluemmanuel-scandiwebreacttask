import React, { Component } from 'react'
import {Link} from "react-router-dom"
import "../Styles/Navigation.css"

export class Navigation extends Component {
  render() {
    const displayCategories  = this.props.categories

     return displayCategories && displayCategories.map((category, index)=>{

       return <div key={index}>
        <ul  className='navigation'>
            <li>
                <Link to={`${category.name}`} className='links'>     
                   {category.name.toUpperCase()}
                </Link>
            </li>
        </ul>
       </div> 
       
     }
        )
  }
}

export default Navigation