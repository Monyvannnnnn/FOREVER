import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js";
import bannerRouter from "./routes/bannerRouter.js";
// app config
const app = express();
const port = process.env.PORT || 4000;
dotenv.config();
connectDB();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));
app.options('*', cors());


// api endpoints

app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter)
//update banner
app.use("/api/banner", bannerRouter);
app.get("/", (req, res) => {
    res.send("API working")
})

app.listen(port, () => console.log(`listening on localhost:${port}`));

export default app;