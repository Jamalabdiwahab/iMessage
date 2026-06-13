import mongoose from "mongoose";

export const connectToDB=async () => {
    try {

        await mongoose.connect(process.env.MONGO_LOCAL);
        console.log("mongodb connected successfully");
        
    } catch (error) {
        console.error("Error connecting to MONGO DB: ",error);
        process.exit(1);
    }
    
}