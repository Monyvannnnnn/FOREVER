import express from "express";
import { loginUser, registerUser, adminLogin, loginLimiter } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginLimiter, loginUser)
userRouter.post('/admin',loginLimiter, adminLogin)

export default userRouter;