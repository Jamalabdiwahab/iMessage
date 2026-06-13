import "dotenv/config";
import express from 'express';
import cors from 'cors';
import { connectToDB } from "./config/db.js";

const app=express();

const PORT=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/health",(_,res)=>{
    res.json({message:"server is healthy"})
})

connectToDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })
})