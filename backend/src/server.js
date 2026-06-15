
import "dotenv/config";

import fs from "fs";
import path from "path";

import express from 'express';
import cors from 'cors';

import { connectToDB } from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import job from "./lib/cron.js";
import clerkWebhook from "./webhooks/clerk.webhook.js"
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const app=express();

const PORT=process.env.PORT || 5000;
const FRONTEND_URL=process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(), "public")

// it's important that you don't parse the webhook event data, it should be in the raw format
app.use("/api/webhooks/clerk", express.raw({ type: "application/json" }), clerkWebhook);

app.use(express.json());
app.use(cors({
    origin:FRONTEND_URL,
    credentials:true
}));
app.use(clerkMiddleware());

app.use("/health",(_,res)=>{
    res.json({message:"server is healthy"})
})

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)


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

        if(process.env.NODE_ENV === "production") job.start();
    })
})