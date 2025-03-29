import bcrypt from 'bcryptjs';
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
        const newUser = new User({ userName, email, password: hashPass });

        await newUser.save();
        res.status(200).json({ success: true, message: "Registration successful" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
};

// Login
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

        res.status(200).json({ success: true, message: "Login successful" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: "Some error occurred" });
    }
};

export {register, login}; 
