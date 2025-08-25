import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middlerware/rateLimiter.js";
import transactionRoute from "./routes/transactionRoute.js";
import job from "./config/cron.js";

dotenv.config();

if (process.env.NODE_ENV === "production") job.start();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(rateLimiter);
app.use(express.json());

//Database initialization
app.get("/api/health", (req,res) => {
    res.status(200).json({status: "ok"});
});

app.use("/api/transactions",transactionRoute);


initDB().then(() => {
    app.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
    }); 
});

