import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
// app config
const app = express();
const port = process.env.PORT || 4000;
dotenv.config();
connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());


// api endpoints

app.use('/api/user',userRouter);
app.use('/api/product',productRouter)

app.get("/", (req, res) => {
    res.send("API working")
})

app.listen(port, () => console.log(`listening on localhost:${port}`));