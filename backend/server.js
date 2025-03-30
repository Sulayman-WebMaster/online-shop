
import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import cookieParser  from 'cookie-parser';
import {connectDB} from './db.js'
import router from './Routes/auth-route.js';
const app = express();
env.config();
connectDB();
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Requested-With',
            'Accept',
            'Origin',
            'Expires',
            'Cache-Control',
        ]
    })
)
app.use('/api/auth',router)
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server running ${PORT}`))