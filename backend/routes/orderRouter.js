import express from 'express'

import { placeOrder, placeOrderStripe, allOrders, userOrder, updateStatus, verifyStripe } from '../controllers/orderController.js'

import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router();


//admin feature
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth,updateStatus)



//Payment feature
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe', authUser,placeOrderStripe)
orderRouter.post('/verifyStripe', authUser, verifyStripe)



//user feature
orderRouter.post('/userorders',authUser,userOrder)
//verify stripe
orderRouter.post('/verify',authUser, verifyStripe)

export default orderRouter
