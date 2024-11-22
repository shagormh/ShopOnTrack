import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../Footer/Footer'
import LoginPopUP from '../LoginPopUP/LoginPopUP'
import ScrollToTop from './ScrollToTop'

const Root = () => {
  const [showLgin, setShowLogin] = useState(false)

  return (
    <>
    {
      showLgin ? <LoginPopUP setShowLogin={setShowLogin} /> : <></>
    }
    <div className='app'>
    <ScrollToTop/>
      <Navbar setShowLogin={setShowLogin} />
      <Outlet />
    </div>
      <Footer />
    </>
  )
}

export default Root