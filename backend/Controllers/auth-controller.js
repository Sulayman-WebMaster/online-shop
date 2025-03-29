import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

// Register
const register = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        if (!userName || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        const hashPass = await bcrypt.hash(password, 12);
        const newUser = new User({ userName, email, password: hashPass, role: "user" });

        await newUser.save();
        res.status(200).json({ success: true, message: "Registration successful" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
};



const login = async (req, res) => {
    const { userName, password } = req.body;
    try {
        if (!userName || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role || "user", email: user.email },
            process.env.JWT,
            { expiresIn: "1h" }
        );

        // Set the token in a cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Set secure cookie in production
            sameSite: "strict",
            maxAge: 3600000, // 1 hour
        });

        // Send success response with user details
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                userName: user.userName,
                email: user.email,
                role: user.role,
            },
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }

};

const logout = async (req, res) => {    
    try {
        res.clearCookie("token");
        return res.status(200).json({ success: true, message: "Logout successful" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ success: false, message: "Some error occurred" });
    }
}
//auth middleware
const authMidleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT);
        req.user = decoded;
        next();
    } catch (e) {
        console.error(e);
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
};

export {register, login, logout, authMidleware}; 
