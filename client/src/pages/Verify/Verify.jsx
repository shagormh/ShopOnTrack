import React, { useEffect } from 'react'
import "./Verify.css"
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import {foodStoreContext} from "../../context/StoreContext"
import axios from 'axios'
const Verify = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  const {url} = useContext(foodStoreContext)
  const navigate = useNavigate()
  useEffect(()=>{
    verifyPayment()
  },[])
  const data = {
    success,
    orderId
  }
  const verifyPayment = async () => {
    const token =  localStorage.getItem("token")
    const response = await axios.post(`${url}/api/order/verify`, data, {headers: {token}})
    console.log(response)
    if (response.data.success) {
      navigate("/myorders")
    }else{
      navigate("/")
    }
  }

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  )
}

export default Verify