import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, removeFromCart } from '../../redux/slices/cartSlice';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const { cart, loading } = useSelector(state => state.cart);

    const getTotalWithDiscount = () => {
        return cart?.products?.reduce((acc, item) => {
            const price = item?.productId?.price || 0;
            const discount = item?.productId?.discount || 0;
            const discountedPrice = price * (1 - discount / 100);
            return acc + discountedPrice * item.quantity;
        }, 0).toFixed(2);
    };

    const getSubtotal = () => {
        return cart?.products?.reduce((acc, item) => {
            const price = item?.productId?.price || 0;
            return acc + price * item.quantity;
        }, 0).toFixed(2);
    };

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    return (
        <section className="shoping-cart spad">
            <div className="container">
                {loading && <p>Loading...</p>}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shoping_cart_table" style={{ width: "100%", overflowX: "auto" }}>
                            <table style={{ width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th className="shoping__product" style={{ width: "16.6%" }}>Products</th>
                                        <th style={{ width: "16.6%" }}>Price</th>
                                        <th style={{ width: "16.6%" }}>Discount</th>
                                        <th style={{ width: "16.6%" }}>Quantity</th>
                                        <th style={{ width: "16.6%" }}>Total</th>
                                        <th style={{ width: "16.6%" }}>Discounted Total</th>
                                        <th style={{ width: "16.6%" }}>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart && cart.products && cart.products.filter(product => product?.productId).map((product) => (
                                        <tr key={product?.productId?._id}>
                                            <td className="shoping_cart_item">
                                                <strong style={{ fontSize: "20px" }}>
                                                    {product?.productId?.name}
                                                </strong>
                                            </td>
                                            <td className="shoping_cart_price">
                                                Rs {product?.productId?.price}
                                            </td>
                                            <td className="shoping_cart_discount">
                                                <strong>
                                                    {product?.productId?.discount
                                                        ? `${product.productId.discount}%`
                                                        : "No Discount"}
                                                </strong>
                                            </td>
                                            <td className="shoping_cart_quantity">
                                                <div className="quantity">
                                                    <div className="pro-qty">
                                                        <strong>
                                                            <input
                                                                type="text"
                                                                value={product.quantity}
                                                                readOnly
                                                                style={{ width: "40px", textAlign: "center" }}
                                                            />
                                                        </strong>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="shoping__cart">
                                                <strong>
                                                    Rs {(product.quantity * product.productId.price).toFixed(2)}
                                                </strong>
                                            </td>
                                            <td className="shoping_cart_total">
                                                Rs {(
                                                    (product?.productId?.price - (product?.productId?.price * (product?.productId?.discount || 0) / 100))
                                                    * product.quantity
                                                ).toFixed(2)}
                                            </td>
                                            <td>
                                                {product?.productId?._id ? (
                                                    <MdDelete
                                                        style={{ color: "red", fontSize: 20, cursor: "pointer" }}
                                                        onClick={() => dispatch(removeFromCart(product.productId._id))}
                                                    />
                                                ) : null}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="shoping__continue">
                            <div className="shoping__discount">
                                <h5>Discount Codes</h5>
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        toast.info("Coupon functionality not implemented.");
                                    }}
                                >
                                    <input type="text" placeholder="Enter your coupon code" />
                                    <button className="site-btn" type="submit">APPLY COUPON</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="shoping__checkout">
                            <h5>Cart Total</h5>
                            <ul>
                                <li>Subtotal : <span>Rs {getSubtotal()}</span></li>
                                <li>Total Price : <span>Rs {getTotalWithDiscount()}</span></li>
                            </ul>

                            {
                                cart && cart.products && cart.products.filter(p => p?.productId).length > 0
                                    ? <Link to="/user/add/address" className="primary-btn"> PROCEED TO CHECKOUT </Link>
                                    : <button className="primary-btn" disabled> PROCEED TO CHECKOUT </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
