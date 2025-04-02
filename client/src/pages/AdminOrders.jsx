import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { adminOrder, adminVerifyOrder } from "../store/admin-slice";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await dispatch(adminOrder());
      console.log(response);

      setOrders(response.payload);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const verifyOrder = async (orderId) => {
    try {
      const response = await dispatch(adminVerifyOrder(orderId));
      if (response.status === 200) {
        // Update the local order status to "completed"
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "completed" } : order
          )
        );
      }

      fetchOrders(); // Refresh orders after verification
    } catch (error) {
      console.error("Error verifying order:", error);
    }
  };

  console.log(orders);

  return (
    <div>
      <h2>Admin Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Subscription Type</th>
            <th>Status</th>
            <th>Verify</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId.subscriptionType}</td>
              <td>{order.status}</td>
              <td>
                {order.status === "pending" ? (
                  <button onClick={() => verifyOrder(order._id)}>Verify</button>
                ) : (
                  "Verified"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
