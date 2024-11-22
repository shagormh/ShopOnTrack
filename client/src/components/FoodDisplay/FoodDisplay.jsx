import React, { useContext } from 'react'
import './foodDisplay.css'
import { foodStoreContext } from "../../context/StoreContext"
import FoodItem from '../FoodItem/FoodItem'
const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(foodStoreContext)
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {
          food_list.map((item, idx) => {
            if (category === "All" || category ===  item.category) {
              
              return (
              <FoodItem key={idx}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image} />
            )
            }
          })
        }
      </div>
    </div>
  )
}

export default FoodDisplay