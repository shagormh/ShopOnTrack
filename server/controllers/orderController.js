import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import myCache from "../config/cache.js";
import Stripe from "stripe"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// placing user order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = `http://localhost:5173`

    try {

        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            status: req.body.status,
            date: Date.now(),
            payment: false,
        })

       const addedOrder =  await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId, { cardData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100 * 1
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 1
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        
        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}


const verifyOrder = async (req, res) => {
    const {userId, orderId, success} = req.body;

    try {
        if (success === "true" || userId ) {
            await orderModel.findByIdAndUpdate(orderId, {
                payment: true,
            })
        res.json({ success: true, message:"Paid"})

        }else{
            await orderModel.findByIdAndDelete(orderId)
        res.json({ success: false, message:"Not Paid"})
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message:"Error"})

    }
    
}



// user order for frontend

const userOrders = async (req, res) => {


    try {
        const orders = await orderModel.find({userId: req.body.userId})
        res.json({success: true , data: orders})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message:"Error"})
    }
}

// Listing orders for panel 
const listOrders = async (req, res) => {
    try {
        const cacheKey = 'all_products';
        const cachedProducts = myCache.get(cacheKey);
        // console.log(cachedProducts)
      if (cachedProducts) {
        return res.status(200).json({ success: true, data: cachedProducts })
      }

        const orders = await orderModel.find({});
        myCache.set(cacheKey, orders, 120); // Cache for 2 minutes
        res.json({success: true, data: orders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Faild to fetch"})

    }
}

//api for updating order status

const updateOrderStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status})
        res.json({success: true, message:"Status Updated"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateOrderStatus }