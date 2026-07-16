import express from 'express'

import { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrder, updateStatus } from '../controllers/orderController.js'

import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router();


//admin feature
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth,updateStatus)



//Payment feature
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe', authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser, placeOrderRazorpay)



//user feature
orderRouter.post('/userorders',authUser,userOrder)


export default orderRouter
