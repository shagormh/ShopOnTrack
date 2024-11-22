import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
export const adminContent = createContext(null)
const AdminContext = ({children}) => {
  const [list, setList] = useState([])

const url = 'http://127.0.0.1:3000'
const imgUrl = 'http://127.0.0.1:3000/images'


const fetchList = async () => {
  const response = await axios.get(`${url}/api/food/list`);
  console.log(response.data)
  if (response.data.success) {
    toast.success("List Items is Fetching successfully")
    setList(response.data.data)
  } else {
    toast.error("List Items is not Fetching ")
  }
}


useEffect(() => {
  fetchList();
}, [])

const removeFoodItems = async (foodId) => {
  const response = await axios.post(`${url}/api/food/remove`, {id: foodId});
  if (response.data.success) {
    fetchList();
    toast.success(response.data?.message)
  }else{
    toast.error(response.data?.message)
  }
  }
const info = {url, imgUrl ,list,removeFoodItems,fetchList}
  return (
   
   <adminContent.Provider value={info}>
   {children}
   </adminContent.Provider>
   
  )
}

export default AdminContext