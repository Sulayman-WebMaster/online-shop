import express from 'express'
import {register,login, logout, authMidleware} from '../Controllers/auth-controller.js';
const router = express.Router();

router.post('/register', register)
router.post('/login',login)
router.post('/logout',logout)
router.get('/check-auth',authMidleware, (req,res)=>{
    const user= req.user;
    res.status(200).json({
        success:true,
        Message:"User is authenticated",
        user
    })
})

export default router 