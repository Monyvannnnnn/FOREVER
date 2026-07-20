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
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, token");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});
app.use(cors());


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