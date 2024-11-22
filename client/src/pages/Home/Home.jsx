import React, { useContext, useEffect, useState } from 'react'
import './home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { helix } from 'ldrs'
import { foodStoreContext } from '../../context/StoreContext'
import PatientReducer from '../PatientReducer/PatientReducer'


// Default values shown

const Home = () => {
   // title
  document.title = 'Borniyes Food '
  const [category, setCategory] = useState("All")
  const [timer, setTimer] = useState(false)
  const {count, setCount,food_list} = useContext(foodStoreContext)
  // console.log(food_list.length)

  helix.register()
  useEffect(() => {
    const loading = setTimeout(() => {
      setCount(prev => prev + 1)
      setTimer(true)
    }, 300);
    return () => {clearTimeout(loading) 
      setTimer(false)}
  }, [])
  return (
    <div className='homepage_section'>
      {
        // !timer && count === 0  
        !food_list.length > 1  
        ? (
          <div className='loading'>
          <l-helix
            size="80"
            speed="2.5"
            color="#800000"
            ></l-helix>
            </div>
        ) : (
          <>
          {/* <PatientReducer /> */}
          <Header />
          <ExploreMenu category={category} setCategory={setCategory} />
          <FoodDisplay category={category} />
          <AppDownload />
          </>
        )
      }
         
          


    </div>
  )
}

export default Home