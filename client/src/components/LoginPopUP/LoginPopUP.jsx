import React, { useContext, useState } from 'react'
import './LoginPopUP.css'
import { assets } from '../../assets/assets'
import { foodStoreContext } from '../../context/StoreContext'
import axios from "axios"
import toast from 'react-hot-toast';



const LoginPopUP = ({ setShowLogin }) => {
    const [currState, setcurrentState] = useState("Login")
    const { url , setToken,token } = useContext(foodStoreContext)
    const [data, setData] = useState({

        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name)
        setData({ ...data, [name]: value });
    }
    // console.log(data)


    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;

        if (currState === "Login") {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"

        }

        const response = await axios.post(newUrl, data)
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false)
            toast.success("You are loging successfully")
        }else{
            toast.error(response.data.message)
            
        }
    }
    console.log(token)
    return (
        <div className='login-popup'>
            <form action='' onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-input">
                    {
                        currState === "Login" ? <></> : <input type="text" placeholder='Your Name' name='name' onChange={onChangeHandler} required />
                    }

                    <input type="email" placeholder='Your Email' onChange={onChangeHandler} name="email" id="" required />
                    <input type="password" placeholder='Your password' name="password" id="" onChange={onChangeHandler} required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                  {
                  currState === "Sign Up" &&  <>  <input type="checkbox" name="Checkbox" id="accept" required />
                    <label htmlFor='accept'>By Continuing, I agree to the terms of use & privacy policy</label>
                  </> 
                    }
                </div>
                {
                    currState === "Login" ?
                        <p>Create a new Account? <span onClick={() => setcurrentState("Sign Up")}>Click Here</span></p>
                        : <p>Already have an account ? <span onClick={() => setcurrentState("Login")}>Login here</span></p>
                }

            </form>
        </div>
    )
}

export default LoginPopUP