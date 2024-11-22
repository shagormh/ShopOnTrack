import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv.apply()
export const connectDB = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@first-project.dkbbjak.mongodb.net/?retryWrites=true&w=majority&appName=First-Project`,{
        dbName: "food-del"
    })
        .then(res => {
            // console.log(res)
            console.log(("DB Connected"));
        })
        
}