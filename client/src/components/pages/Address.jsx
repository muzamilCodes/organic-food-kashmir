import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCurrentOrder, setPaymentMethod as setPaymentMethodRedux } from '../../redux/slices/orderSlice';

const Address = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addressArr, setAddressArr] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [cart, setCart] = useState({});
  const [paymentMethodState, setPaymentMethodState] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    country: "",
    email: "",
    mobile: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const createAddressHandler = async (e) => {
    e.preventDefault();
    const requiredFields = ["firstName", "lastName", "street", "city", "district", "state", "pincode", "country", "email", "mobile"];
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        toast.error("All fields are required.");
        return;
      }
    }
    try {
      const res = await axiosInstance.post("/address/create", formData);
      if (res.status === 201) {
        toast.success(res.data.message);
        setFormData({
          firstName: "", lastName: "", street: "", city: "",
          district: "", state: "", pincode: "", country: "", email: "", mobile: ""
        });
        await fetchAddress();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create address");
    }
  };

  const fetchAddress = async () => {
    try {
      const res = await axiosInstance.get("/address/getAllAddresses");
      if (res.status === 200) {
        setAddressArr(res.data.payload);
        if (res.data.payload.length > 0) {
          setSelectedAddressId(res.data.payload[0]._id);
          setFormData(res.data.payload[0]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCartData = async () => {
    try {
      const res = await axiosInstance.get("/cart/getCart");
      if (res.status === 200) setCart(res.data.payload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAddress();
    fetchCartData();
  }, []);

  const handlePlaceOrder = async () => {
    if (!selectedAddressId || addressArr.length === 0) {
      toast.error("Please add and select an address before placing the order.");
      return;
    }
    try {
      const res = await axiosInstance.post(
        `/order/createCartOrder?cartId=${cart._id}&addressId=${selectedAddressId}`
      );
      if (res.status === 201) {
        // Save order in Redux
        dispatch(setCurrentOrder({ order: res.data.order, paymentMethod: paymentMethodState }));
        dispatch(setPaymentMethodRedux(paymentMethodState));

        if (paymentMethodState === "online") {
          navigate("/payment");
        } else {
          toast.success(res.data.message);
          navigate("/order-success");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Order creation failed");
    }
  };

  return (
    <div>
      <section className="checkout spad">
        <div className="container">
          <div className="checkout__form">
            <h4>Billing Details</h4>
            <form onSubmit={createAddressHandler}>
              <div className="row">
                <div className="col-lg-8 col-md-6">
                  {/* Address selection if addresses exist */}
                  {addressArr.length > 0 && (
                    <div className="mb-4">
                      <h5 className="mb-3">Select Address</h5>
                      {addressArr.map((addr) => (
                        <div
                          key={addr._id}
                          className={`form-check p-3 mb-2 rounded shadow-sm ${selectedAddressId === addr._id ? "border border-primary" : "border border-light"
                            }`}
                          style={{ backgroundColor: "#fefefe", transition: "0.3s" }}
                        >
                          <input
                            className="form-check-input me-2"
                            type="radio"
                            name="selectedAddress"
                            id={addr._id}
                            checked={selectedAddressId === addr._id}
                            onChange={() => setSelectedAddressId(addr._id)}
                            style={{ transform: "scale(1.2)" }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={addr._id}
                            style={{ cursor: "pointer", display: "block", lineHeight: "1.5" }}
                          >
                            <strong>Name:</strong> {addr.firstName} {addr.lastName}<br />
                            <strong>Street:</strong> {addr.street}, <strong>City:</strong> {addr.city}, <strong>State:</strong> {addr.state}, <strong>Pincode:</strong> {addr.pincode}, <strong>Country:</strong> {addr.country}<br />
                            <span><strong>Phone:</strong> {addr.mobile}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  )}


                  {/* Add New Address Form */}
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>First Name<span>*</span></p>
                        <input type="text" value={formData.firstName} name='firstName' onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>Last Name<span>*</span></p>
                        <input type="text" value={formData.lastName} name='lastName' onChange={handleInputChange} />
                      </div>
                    </div>
                  </div>

                  <div className="checkout__input">
                    <p>Street Address<span>*</span></p>
                    <input type="text" value={formData.street} name='street' onChange={handleInputChange} />
                  </div>

                  <div className="checkout__input">
                    <p>Town/City<span>*</span></p>
                    <input type="text" value={formData.city} name='city' onChange={handleInputChange} />
                  </div>

                  <div className="checkout__input">
                    <p>District<span>*</span></p>
                    <input type="text" value={formData.district} name='district' onChange={handleInputChange} />
                  </div>

                  <div className="checkout__input">
                    <p>State<span>*</span></p>
                    <input type="text" value={formData.state} name='state' onChange={handleInputChange} />
                  </div>

                  <div className="checkout__input">
                    <p>Postcode / ZIP<span>*</span></p>
                    <input type="text" value={formData.pincode} name='pincode' onChange={handleInputChange} />
                  </div>

                  <div className="checkout__input">
                    <p>Country<span>*</span></p>
                    <input type="text" value={formData.country} name='country' onChange={handleInputChange} />
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>Phone<span>*</span></p>
                        <input type="text" value={formData.mobile} name='mobile' onChange={handleInputChange} />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>Email<span>*</span></p>
                        <input type="text" value={formData.email} name='email' onChange={handleInputChange} />
                      </div>
                    </div>
                  </div>

                  <div className='d-flex justify-content-end'>
                    <button type='submit' className='site-btn my-3'> Add Address</button>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="col-lg-4 col-md-6">
                  {addressArr.length === 0 ? (
                    <div className="alert alert-warning mt-4">
                      Please add an address before placing your order.
                    </div>
                  ) : (
                    <>
                      <div className="checkout__order p-4 rounded shadow-sm" style={{ backgroundColor: "#fff8f0", border: "1px solid #f0e6da" }}>
                        <h4 className="mb-3" style={{ borderBottom: "2px solid #ff6b6b", paddingBottom: "5px" }}>Your Order</h4>

                        <div className="checkout_order_products d-flex justify-content-between fw-bold mb-2" style={{ borderBottom: "1px solid #ddd", paddingBottom: "5px" }}>
                          <span>Products</span>
                          <span>Total</span>
                        </div>

                        <ul className="list-unstyled mb-3">
                          {cart?.products
                            ?.filter(product => product.productId)
                            .map((product) => (
                              <li key={product.productId._id} className="d-flex justify-content-between py-2 border-bottom" style={{ fontSize: "0.95rem" }}>
                                <span>{product.productId.name}</span>
                                <span>
                                  Rs {(
                                    (product.productId.price - (product.productId.price * (product.productId.discount || 0)) / 100)
                                    * product.quantity
                                  ).toFixed(2)}
                                </span>
                              </li>
                            ))}
                        </ul>

                        <div className="checkout_order_total d-flex justify-content-between fw-bold fs-5 mb-3">
                          <span>Total</span>
                          <span>
                            Rs {cart.products
                              ?.filter(product => product.productId)
                              .reduce((acc, product) => {
                                const price = product.productId.price || 0;
                                const discount = product.productId.discount || 0;
                                const discountedPrice = price * (1 - discount / 100);
                                return acc + discountedPrice * product.quantity;
                              }, 0)
                              .toFixed(2)}
                          </span>
                        </div>

                        <button
                          className="site-btn w-100"
                          type="button"
                          onClick={handlePlaceOrder}
                          disabled={addressArr.length === 0}
                          style={{ backgroundColor: "#0578e3ff", border: "none", fontWeight: "600" }}
                        >
                          PLACE ORDER
                        </button>
                      </div>


                      {/* Payment Method */}
                      <div className="payment-method my-4 p-4 rounded shadow" style={{ backgroundColor: "#f4f4f4ff" }}>
                        <h5 className="fw-bold fs-4 mb-3">Select Payment Method</h5>
                        <div className="form-check mb-3 fs-6">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="paymentCod"
                            value="cod"
                            checked={paymentMethodState === "cod"}
                            onChange={() => {
                              setPaymentMethodState("cod");
                              dispatch(setPaymentMethodRedux("cod"));
                            }}
                            style={{ transform: "scale(1.2)", marginRight: "10px" }}
                          />
                          <label className="form-check-label" htmlFor="paymentCod">
                            Cash on Delivery (COD)
                          </label>
                        </div>
                        <div className="form-check fs-6">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="paymentOnline"
                            value="online"
                            checked={paymentMethodState === "online"}
                            onChange={() => {
                              setPaymentMethodState("online");
                              dispatch(setPaymentMethodRedux("online"));
                            }}
                            style={{ transform: "scale(1.2)", marginRight: "10px" }}
                          />
                          <label className="form-check-label" htmlFor="paymentOnline">
                            Online Payment
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Address;
