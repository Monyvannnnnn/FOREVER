import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../App'
import { assets } from '../admin_assets/assets';

const Order = ({ token }) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message || "Status updated successfully");
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-5">Order Page</h3>
      <div>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1.5fr_1fr_1fr] gap-4 items-start border border-gray-300 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 bg-white' key={index}>
              <img className='w-12 sm:w-16' src={assets.parcel_icon} alt="Parcel" />
              <div>
                <div>
                  {order.items.map((item, itemIndex) => {
                    if (itemIndex === order.items.length - 1) {
                      return <p className='py-0.5' key={itemIndex}> {item.name} x {item.quantity} <span className='text-gray-400'> {item.size} </span> </p>
                    } else {
                      return <p className='py-0.5' key={itemIndex}> {item.name} x {item.quantity} <span className='text-gray-400'> {item.size} </span>, </p>
                    }
                  })}
                </div>
                <p className='mt-3 mb-1 font-semibold text-gray-900'>{order.address.firstName + " " + order.address.lastName}</p>
                <div className='text-gray-600'>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipCode}</p>
                </div>
                <p className='mt-2 font-medium text-gray-800'>{order.address.phone}</p>
              </div>
              <div className='text-gray-600 font-medium'>
                <p className='text-sm'>Items : {order.items.length}</p>
                <p className='mt-1'>Method : {order.paymentMethod}</p>
                <p className='mt-1'>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                <p className='mt-1'>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-base font-bold text-gray-900'>{currency}{order.amount}</p>
              <select className='p-2 border border-gray-300 rounded font-semibold text-gray-700 bg-white cursor-pointer outline-none hover:border-gray-400' onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Order
