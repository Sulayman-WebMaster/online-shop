
import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import cookieParser  from 'cookie-parser';
import {connectDB} from './db.js'
const app = express();
env.config();
connectDB();
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin : 'http://localhost:5173/',
        methods : ['GET','POST','DELETE','PUT'],
        allowedHeaders : [
            "content-Type",
            "Authorization",
            "Cache-control",
            "Expires",
            "Progma"
        ],
        credentials : true
    })
)
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server running ${PORT}`))