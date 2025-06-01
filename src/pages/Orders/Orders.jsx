import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error('Error fetching orders');
      }
    } catch (error) {
      toast.error('Server error');
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error('Status update failed');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // // Static example orders
  // const staticOrders = [
  //   {
  //     _id: 'static1',
  //     items: [
  //       { name: 'Margherita Pizza', quantity: 1 },
  //       { name: 'Garlic Bread', quantity: 2 },
  //     ],
  //     address: {
  //       firstName: 'Alice',
  //       lastName: 'Johnson',
  //       street: '123 Tomato Lane',
  //       city: 'Flavor Town',
  //       state: 'CA',
  //       country: 'USA',
  //       zipcode: '90001',
  //       phone: '123-456-7890',
  //     },
  //     amount: 22.99,
  //     status: 'Out for delivery',
  //   },
  //   {
  //     _id: 'static2',
  //     items: [
  //       { name: 'Pad Thai', quantity: 1 },
  //     ],
  //     address: {
  //       firstName: 'Bob',
  //       lastName: 'Smith',
  //       street: '456 Spice St',
  //       city: 'Tastyville',
  //       state: 'TX',
  //       country: 'USA',
  //       zipcode: '73301',
  //       phone: '987-654-3210',
  //     },
  //     amount: 12.5,
  //     status: 'Delivered',
  //   },
  // ];

  return (
    <div className="orders-container">
      <h2 className="orders-title">Customer Orders</h2>

      <div className="order-list">
        {orders.map((order, index) => (
          <div key={order._id || index} className="order-item">
            <img src={assets.parcel_icon} alt="parcel" className="order-icon" />
            <div className="order-details">
              <p className="order-foods">
                {order.items.map((item, idx) =>
                  idx === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p className="order-customer">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="order-address">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{' '}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>
              <p className="order-phone">{order.address.phone}</p>
            </div>
            <div className="order-meta">
              <p>Items: {order.items.length}</p>
              <p className="order-price">${order.amount}</p>
              <select
                className="order-status"
                onChange={(e) =>
                  order._id.startsWith('static')
                    ? toast.info('Static order - status locked')
                    : statusHandler(e, order._id)
                }
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
