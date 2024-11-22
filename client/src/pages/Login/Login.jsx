import './login.css'
import React, { useContext, useEffect, useState } from 'react'
import img1 from '../../assets/pngegg.png'
import { Helmet } from 'react-helmet';
import SocialBox from '../../components/SocialBox/SocialBox';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { foodStoreContext } from '../../context/StoreContext';
import axios from 'axios';
import toast from 'react-hot-toast';
const Login = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const [isActive, setIsActive] = useState(false);
  const { url,setShowLogin,setToken } = useContext(foodStoreContext)
  const [userActive, setUserActive] = useState(false);
  const [data, setData] = useState({

    name: "",
    email: "",
    password: ""
  })

  console.log(location.state)

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  }
  // console.log(data)

  const onLogin = async (e) => {
    e.preventDefault();


    const newUrl1 = `${url}/api/user/login`;


    const response = await axios.post(newUrl1, data)
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate(from || '/');
      toast.success("You are loging successfully")
    } else {
      toast.error(response.data.message)

    }
  }

  const onRegister = async (e) => {
    e.preventDefault();

    const newUrl2 = `${url}/api/user/register`;

    const response = await axios.post(newUrl2, data)
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate(from || '/');
      toast.success("You are loging successfully")
    } else {
      toast.error(response.data.message)

    }
  }
  return (
    <>
      <Helmet>
        <title>Authentication</title>
        <meta name="description" content="Sign In or Sign up " />
      </Helmet>

      {
        !userActive ? (
          <div className='auth'>
            <div className={`container ${!isActive ? 'active' : ''}`}>

              {/*  ############## Sign In Section #####################  */}

              <div className="user signin-box">
                <div className="overlay">
                  <h1>New Here?</h1>
                  <img src={img1} alt="" />
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum non repellat unde!</p>
                  <button className='signup btn' onClick={() => setIsActive(!isActive)} >Sign Up</button>
                </div>
                <form onSubmit={onLogin} className="form-box">
                  <div className="form">
                    <h2>Sign In</h2>
                    <SocialBox />
                    <input type="email" placeholder='email' onChange={onChangeHandler} name='email' required />
                    <input type="Password" name="password" placeholder='Password' min={6} max={20} onChange={onChangeHandler} required />
                    <button >Sign In</button>
                    <p className='footer-text'>Dont't have an account?
                      <span onClick={() => setIsActive(!isActive)}> Sign up</span>
                    </p>
                  </div>
                </form>
              </div>

              {/*  ############## Sign Up Section #####################  */}

              <div className="user signup-box">
                <form onSubmit={onRegister} className="form-box">
                  <div className="form" >
                    <h2>Sign up</h2>
                    <SocialBox />
                    <input type="text" placeholder='Name' onChange={onChangeHandler} name='name' required />
                    <input type="email" name="email" placeholder='email' onChange={onChangeHandler} required />
                    <input type="Password" name='password' placeholder='Password' min={6} max={20} onChange={onChangeHandler} required />
                    <button type='submit'>Submit</button>
                    <p className='footer-text'>Already have an account?
                      <span onClick={() => setIsActive(!isActive)}> Sign In</span>
                    </p>
                  </div>
                </form>
                <div className="overlay">
                  <h1>one of us?</h1>
                  <img src={img1} alt="" />
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum non repellat unde!</p>
                  <button className='signin btn' onClick={() => setIsActive(!isActive)} >Sign In</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className='footText'>user Log In successfully</p>
            <button >sign out</button>
          </>
        )
      }
    </>
  )
}

export default Login