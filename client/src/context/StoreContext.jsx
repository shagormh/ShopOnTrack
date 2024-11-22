import React, { createContext, useEffect, useState } from 'react'
// import { food_list } from "../assets/assets"
import axios from "axios"
import toast from 'react-hot-toast';

export const foodStoreContext = createContext(null)
const StoreContext = ({ children }) => {
    const [cartItems, setCartItems] = useState({})
    const [count, setCount] = useState(0)
    const url = 'http://127.0.0.1:3000'
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        if (token) {
            const response = await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });

            if (response.data.success) {
                toast(response.data.message)
            }
        }
    }
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }
    const deleteFromCart =async (itemId) => {
        // Create a copy of the cartItems state object
        const updatedCartItems = { ...cartItems };
        // Remove the itemId key from the copied object
        delete updatedCartItems[itemId];
        // Update the cartItems state with the modified object
        setCartItems(updatedCartItems);
   
        if (token) {
          const response = await axios.post(`${url}/api/cart/delete` , {itemId}, {headers: {token}})
            // console.log(response)
            if (response.data.success) {
                toast.success(response.data.message)
            }
        }
    };


    const getTotaCartAmmount = () => {
        let totalAmmount = 0;
        for (const key in cartItems) {
            if (cartItems[key] > 0) {
                let itemInfo = food_list.find((product) => product._id === key);
                totalAmmount += itemInfo.price * cartItems[key]
            }
        }
        return totalAmmount
    }





    const fetchfoodList = async () => {
        const response = await axios.get(`${url}/api/food/allList`);
        setFoodList(response.data.data)
    }




    const loadCartData = async (token)=> {
        const response = await axios.post(`${url}/api/cart/get`,{},{headers: {token}})
        setCartItems(response.data.cartData)
    }  
    useEffect(() => {

        async function loadData() {

            fetchfoodList()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData()
        console.log(food_list)
    }, [])

    const content = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotaCartAmmount,
        count,
        setCount,
        deleteFromCart,
        url,
        setToken,
        token
    }


    return (
        <foodStoreContext.Provider value={content}>
            {children}
        </foodStoreContext.Provider>
    )
}

export default StoreContext