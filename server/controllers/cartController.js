import userModel from "../models/userModel.js"


// add items to user Card
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId)
    let cartData = await userData.cardData;
    console.log(req.body.itemId)
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1
    }
    else {
      cartData[req.body.itemId] += 1;
    }
    console.log(cartData)
    await userModel.findByIdAndUpdate(req.body.userId, { cardData: cartData });
    res.json({ success: true, message: "Added To Cart" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

// remove from cart
const removeFromCart = async (req, res) => {

  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cardData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cardData: cartData });
    res.json({ success: true, message: "remove from cart" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

// Delete from Cart

const deleteCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cardData;
    // console.log(req.body.itemId)
    if (cartData[req.body.itemId] > 0) {
     delete cartData[req.body.itemId] 
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cardData: cartData });
    res.json({ success: true, message: "delete from cart" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
};


//get User Data 
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId)
    let cartData = await userData.cardData
    res.status(200).json({ success: true, cartData })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

export { addToCart, removeFromCart, getCart, deleteCart }