import React, { useContext, useEffect, useState } from 'react'
import { foodStoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from "../../assets/assets"
import "./MyOrders.css"
const MyOrders = () => {
    const [data, setData] = useState([])
    const { token, url } = useContext(foodStoreContext)

    const fetchOrders = async () => {
        const response = await axios.post(`${url}/api/order/userOrders`, {}, { headers: { token } })
        setData(response.data.data)
        console.log(response)
    }

    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])

    return (
        <div className="my_orders">
            <h2>My Orders</h2>
            <div className="container_order">
                {
                    data.map((orders, idx) => {
                        return (
                            <div key={idx} className="my_orders_order">
                                <img src={assets.parcel_icon} alt="" />
                                <p>{orders.items.map((item, idex) => {
                                    if (idex === orders.items.length - 1) {
                                        return item.name + " X " + item.quantity
                                    } else {
                                        return item.name + " X " + item.quantity + ", "

                                    }
                                })}</p>
                                <p>${orders.amount}.00</p>
                                <p>Items: {orders.items.length}</p>
                                <p><span>&#x25cf;</span> <b>{orders.status}</b></p>
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MyOrders