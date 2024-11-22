import React from 'react'
import './footer.css'
import { assets } from '../assets/assets'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique velit culpa numquam eaque, recusandae commodi ullam quia corrupti unde obcaecati.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy & Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+900924545400</li>
                        <li>contact@berniyes.com</li>
                    </ul>
                </div>
            </div>
                <hr />
                <p className='footer-copy-right'>
                    Copywrite 2024 @ Berniyes - All Right Reserved
                </p>
        </div>
    )
}

export default Footer