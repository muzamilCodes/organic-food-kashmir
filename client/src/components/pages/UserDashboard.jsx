import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const [cart, setCart] = useState({ products: [] });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axiosInstance.get("/cart/getCart");
        setCart(res.data.payload || { products: [] });
      } catch (err) {
        console.error(err);
        setCart({ products: [] });
      }
    };
    fetchCart();
  }, []);

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/order/fetchAllOrders");
        setOrders(res.data.payload || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Calculate total spent
  const getTotalWithDiscount = () => {
    return cart?.products
      ?.reduce((acc, item) => {
        const price = item?.productId?.price || 0;
        const discount = item?.productId?.discount || 0;
        const discountedPrice = price * (1 - discount / 100);
        return acc + discountedPrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">👤 My Dashboard</h2>

      {/* Stats Row */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm text-center p-3">
            <h5>Total Spent</h5>
            <h3 className="text-success">₹{getTotalWithDiscount()}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center p-3">
            <h5>Total Products in Cart</h5>
            <h3>{cart.products.length}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm text-center p-3">
            <h5>Total Orders</h5>
            <h3>{orders.length}</h3>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card shadow-sm p-3">
        <h5 className="fw-bold mb-3">📦 Recent Orders</h5>
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length > 0 ? (
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Order Value</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>₹{order.orderValue}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.orderStatus === "pending"
                          ? "bg-warning"
                          : "bg-success"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
