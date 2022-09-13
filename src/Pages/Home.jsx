import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import bannerLogo from "../Assets/logo.svg"
import '../Styles/Home.css'


export class Home extends Component {

  componentDidMount(){
   document.title = "Home || Scandi"
  }

   render() {

    return (
      <>
      <div className="home_container">

        <div className="banner">

          <div className="banner-text">
            <h1>Scandi stores</h1>
            <p>Peace of mind products that suits your style</p>
          </div>
          <div className="banner-img">
            <img src={bannerLogo} alt={bannerLogo} />
          </div>

        </div>

        <div className="banner-btn">
          <Link to="/all">
            <button className='home-banner-btn'>SHOP NOW</button>
          </Link>
        </div>

      </div>
      </>
    );
  }
}


export default (Home);