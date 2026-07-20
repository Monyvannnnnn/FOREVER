import dotenv from "dotenv";
import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();
//route for user login

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
  jwt.verify(token, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};

//route for user registration

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    //validate
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};

//route for admin login

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@vacci.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

        if (email === adminEmail && password === adminPassword) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET || 'greatstack');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }       
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Internal server error" });
    }
};

export { loginUser, registerUser, adminLogin };
