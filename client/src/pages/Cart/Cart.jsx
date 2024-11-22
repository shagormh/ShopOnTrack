import React, { useContext, useState } from 'react'
import './cart.css'
import { foodStoreContext } from '../../context/StoreContext'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  // title
  document.title = 'Cart || Borniyes Food '
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);

  const togglePopup = (image) => {
    setIsOpen(!isOpen);
    setImage(image)
  };
  const { food_list, cartItems, removeFromCart, getTotaCartAmmount, deleteFromCart, addToCart,url } = useContext(foodStoreContext)

  const navigate = useNavigate()

  return (
    <>
      {
        isOpen && (
          <div className="popup" onClick={togglePopup}>
            <div className="popup-inner" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={togglePopup}></button>
              <img
                src={`${url}/images/${image}`}
                alt="Sample"
                className="popup-image"
              />
            </div>
          </div>
        )
      }
      <div className='cart'>
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {
            food_list.map((item, idx) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={idx}>

                    <div className="cart-items-title cart-items-item">
                      <img src={`${url}/images/${item.image}`} className='cartImage' alt="" onClick={() => togglePopup(item.image)} />
                      <p>{item.name} </p>
                      <p>$ {item.price}</p>
                      <div className="quantity">
                        <button className="quantity-btn increment" onClick={() => addToCart(item._id)}>+</button>
                        <p className='quantity-input'>{cartItems[item._id]}</p>
                        <button className="quantity-btn decrement" onClick={() => removeFromCart(item._id)}>-</button>
                      </div>
                      <p>$ {item.price * cartItems[item._id]}</p>
                      <p onClick={() => deleteFromCart(item._id)} className='cross'><DeleteForeverIcon /></p>
                    </div>
                    <hr />
                  </div>
                )
              }
            })
          }
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>SubTotal</p>
                <p> $ {getTotaCartAmmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>$ {getTotaCartAmmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>$ {getTotaCartAmmount() === 0 ? 0 : getTotaCartAmmount() + 2}</b>
              </div>
            </div>
            <button onClick={() => navigate("/order")}>Proceed to checked In</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code , Enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder='Promo Code' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart