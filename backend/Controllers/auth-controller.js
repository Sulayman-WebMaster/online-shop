import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../Models/User'
//register

const register = async (req,res)=>{
    const {userName,email,password} = req.body;
    try{
        const hashPass = await bcrypt.hash(password,12);
        const newUser = new User({
            userName,email,hashPass 
        })
        await newUser.save();
    res.status(200).json({
        success: true,
        message: "register successful"
    })


    }catch(e){
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}

// login 
const login = async (req,res)=>{
    const {username,password} = req.body;
    try{


    }catch(e){
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}

export default  register 