import React, {  useContext, useState } from 'react'
import "./Add.css"
import { assets } from "../../assets/assets"
import axios from "axios"
import { adminContent } from '../../Context/AdminContext'
import toast from 'react-hot-toast';

const Add = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  })

const {url,fetchList} = useContext(adminContent)
// console.log(url)


  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]:value}))
  }
  // console.log(data)
  // console.log(image)
  const onSubmitHandler = async (event) =>{
    event.preventDefault()
    const formData = new FormData;
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)
    console.log(formData)

    const response = await axios.post(`${url}/api/food/add`,formData)
    console.log(response)
    if (response.data.success) {
      toast("Successfully Added Items to Database")
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad"
      })
      setImage(false)
      fetchList()
    }else{
      toast(response.data.message)
      
    }
  }
 document.title = "Add Page"
  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add_img_upload flex-col">
          <p> Upload Image</p>
          <label htmlFor='image' >
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Image" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' required hidden />
        </div>
        <div className="add_product_name flex-col">
          <p>Product Name:</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type Here' required />
        </div>
        <div className="add_product_description flex-col">
          <p>Description Name:</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows={6} placeholder='Write Content Here' required></textarea>
        </div>
        <div className="categoryandPrice">
          <div className="add_category_price flex-col">
            <p>Product Category:</p>
            <select onChange={onChangeHandler}  name="category" id="" required>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles" >Noodles</option>
            </select>
          </div>
          <div className="add_price flex-col">
            <p>Product Price:</p>
            <input onChange={onChangeHandler} name='price' value={data.price} type="number" placeholder='$20' required />
          </div>
        </div>
        <button type='submit' className='add_btn'>ADD</button>
      </form>

    </div>
  )
}

export default Add