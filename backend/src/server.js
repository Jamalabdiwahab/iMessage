import "dotenv/config";
import express from 'express';
import cors from 'cors';
import { connectToDB } from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'

const app=express();

const PORT=process.env.PORT || 5000;
const FRONTEND_URL=process.env.FRONTEND_URL;

app.use(express.json());
app.use(cors({
    origin:FRONTEND_URL,
    credentials:true
}));
app.use(clerkMiddleware());

app.use("/health",(_,res)=>{
    res.json({message:"server is healthy"})
})

connectToDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })
})