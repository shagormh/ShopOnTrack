import React from 'react'
import {assets} from "../../assets/assets"
import "./Navbar.css"
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='navbar'>
      <img onClick={()=> navigate("/")} src={assets.logo} className='logo' alt="logo" />
      <img src={assets.profile_image} className='profile' alt="profile_image" />
    </div>
  )
}

export default Navbar