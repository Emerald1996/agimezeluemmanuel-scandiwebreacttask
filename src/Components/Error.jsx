import React, { Component } from 'react'
import Navbar from './Navbar'
import "../Styles/Error.css"

export class Error extends Component {
  render() {
    return (
      <>
        <div>
          <Navbar/>
        </div>
        <div className="error-container">
          <h1>ERROR ❌</h1>
          <p style={{textAlign: "center", fontWeight: "bold"}}>Bad request</p>
        </div>
      </>
    )
  }
}

export default Error