
import "dotenv/config";

import fs from "fs";
import path from "path";

import express from 'express';
import cors from 'cors';

import { connectToDB } from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'

const app=express();

const PORT=process.env.PORT || 5000;
const FRONTEND_URL=process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(), "public")

app.use(express.json());
app.use(cors({
    origin:FRONTEND_URL,
    credentials:true
}));
app.use(clerkMiddleware());

app.use("/health",(_,res)=>{
    res.json({message:"server is healthy"})
})

// if the public directory exists, serve the static files
// this is for the production build
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}

connectToDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })
})