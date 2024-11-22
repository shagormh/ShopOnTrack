import React, { useContext, useEffect, useState } from 'react'
import "./List.css"
import axios from "axios"
import { adminContent } from '../../Context/AdminContext'
const List = () => {
  document.title = "List Page"
  const { url, imgUrl,list,removeFoodItems } = useContext(adminContent)
  
 

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list_table">
        <div className="list_table_format title">
          <b>Imag</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map(function(item,idx) {
            return (
              <div key={idx} className="list_table_format">
                <img src={`${imgUrl}/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p onClick={()=> removeFoodItems(item._id)} className='cursur cross'>X</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default List