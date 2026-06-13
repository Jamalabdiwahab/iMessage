import mongoose from "mongoose";

export const connectToDB=async () => {
    try {

        const mongoUrl=process.env.MONGO_LOCAL

        if(!mongoUrl){
            throw new Error("Mongo_url is required")
        }

        const conn = await mongoose.connect(mongoUrl);
        console.log("mongodb connected successfully", conn.connection.host);
        
    } catch (error) {
        console.error("Error connecting to MONGO DB: ",error);
        process.exit(1);
    }
    
}