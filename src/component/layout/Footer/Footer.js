import React from 'react';
import playStore from "../../../image/playstore.png";
import appStore from "../../../image/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
 <footer id="footer">
    <div className="leftFooter">
         <h4>Download our App</h4>
         <img  src={playStore} alt= "playstore"/>
         <img  src={appStore} alt= "Appstore"/>
    </div>

    <div className = "midFooter">
    <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; AsthaSharma</p>

    </div>

    <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href= "http://instagram.com/sharmaastha139">Instagram</a>
        <a href= "http://youtube.com/sharmaastha139">youtube</a>
        <a href= "http://facebook.com">Instagram</a>

    </div>

 </footer>
   
  );
};

export default Footer