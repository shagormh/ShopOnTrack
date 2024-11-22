import React, { useContext, useEffect, useState } from 'react'
import "./Orders.css"
import { adminContent } from '../../Context/AdminContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { assets } from "../../assets/assets"
const Orders = () => {
  document.title = "Order page || Borniyes Food"

  const [orders, setOrders] = useState([])
  const { url } = useContext(adminContent)
  const fetchAllOrders = async () => {
    const response = await axios.get(`http://127.0.0.1:3000/api/order/list`);
    console.log(response.data.data)
    if (response.data.success) {
      console.log(response.data)
      setOrders(response.data.data)
      toast.success("Order Item Successfully Fetched")
    } else {
      toast.success("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    // console.log(event, orderId)
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders()
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)

    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])
  return (
    <div className='order add'>
      <div className="top-title">
        <h3>Order Page</h3>
        <button className='add_btn' onClick={fetchAllOrders}>Refresh</button>
      </div>
      <div className="order_list">
        {
          orders.map((order, index) => {
            return (

              <div className='order_item' key={index}>
                <img src={assets.parcel_icon} alt="" />
                <div>
                  <p className="order_item_food">
                    {order.items.map((item, idx) => {
                      if (idx === order.items.length - 1) {
                        return item.name + ' x  ' + item.quantity
                      } else {
                        return item.name + ' x  ' + item.quantity + " , "
                      }
                    })}
                  </p>
                  <p className="order_item_name"> {order.address.firstName + " " + order.address.lastName} </p>
                  <div className="order_item_address">
                    <p>{order.address.street + ","}</p>
                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipCode}</p>
                  </div>
                  <p className="order_item_phone">{order.address.phone}</p>
                </div>
                <p>Items: {order.items.length}</p>
                <p>amount: ${order.amount}</p>
                <select onChange={(event) => statusHandler(event, order._id)} >
                  <option value="Food Processing" selected>Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

            )
          })
        }
      </div>
    </div>
  )
}

export default Orders