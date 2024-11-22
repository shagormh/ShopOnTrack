import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, },
    address: { type: Object, },
    status: { type: String, Default: "Order Procesing" },
    date: { type: Date, Default: Date.now() },
    payment: { type: Boolean, Default: false },

})
const orderModel = mongoose.models.order || mongoose.model("order", orderSchema)
export default orderModel