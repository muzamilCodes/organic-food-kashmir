import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance"; // Make sure this import exists

const Navbar = () => {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState({ products: [] });

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Fetch cart data for dynamic cart price
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axiosInstance.get("/cart/getCart");
        if (res.status === 200) {
          setCart(res.data.payload);
        }
      } catch (err) {
        setCart({ products: [] });
      }
    };

    fetchCart();

    // Listen for cart updates
    const handleCartUpdate = () => fetchCart();
    window.addEventListener("cartUpdated", handleCartUpdate);

    // Cleanup
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  // Calculate total cart value with discount
  const getCartTotal = () => {
    if (!cart.products || cart.products.length === 0) return 0;
    return cart.products
      .reduce((acc, item) => {
        const price = item?.productId?.price || 0;
        const discount = item?.productId?.discount || 0;
        const discountedPrice = price * (1 - discount / 100);
        return acc + discountedPrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <>
      {loading && (
        <div id="preloder">
          <div className="loader"></div>
        </div>
      )}

      {/* Hamburger Overlay */}
      <div
        className={`humberger__menu__overlay ${menuOpen ? "active" : ""}`}
        onClick={closeMenu}
      ></div>

      {/* Hamburger Menu */}
      <div
        className={`humberger__menu__wrapper ${
          menuOpen ? "show__humberger__menu__wrapper" : ""
        }`}
      >
        <div className="humberger__menu__logo">
          <Link to="/">
            <img src="img/logo.png" alt="Logo" />
          </Link>
        </div>

        <div className="humberger__menu__cart">
          <ul>
            <li>
              <i className="fa fa-heart"></i> <span>1</span>
            </li>
            <li>
              <i className="fa fa-shopping-bag"></i>{" "}
              <span>{cart.products ? cart.products.length : 0}</span>
            </li>
          </ul>
          <div className="header__cart__price">
            item: <span>Rs {getCartTotal()}</span>
          </div>
        </div>
        <div className="humberger__menu__widget">
          <div className="header__top__right__language">
            <img src="img/language.png" alt="" />
            <div>English</div>
            <span className="arrow_carrot-down"></span>
            <ul>
              <li>Spanis</li>
              <li>English</li>
            </ul>
          </div>
          <div className="header__top__right__auth">
            <i className="fa fa-user"></i> Login
          </div>
        </div>

        <nav className="humberger__menu">
          <ul>
            <li className="active">
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/shop-details">Shop Details</Link>
            </li>
            <li>
              <Link to="/user/cart">Shoping Cart</Link>
            </li>
            <li>
              <Link to="/user/checkout">Check Out</Link>
            </li>
            <li>
              <Link to="/blog-details">Blog Details</Link>
            </li>
            <li>
              <Link to="/posts">Blog</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="header__top__right__social">
          <Link to="#">
            <i className="fa fa-facebook"></i>
          </Link>
          <Link to="#">
            <i className="fa fa-twitter"></i>
          </Link>
          <Link to="#">
            <i className="fa fa-linkedin"></i>
          </Link>
          <Link to="#">
            <i className="fa fa-pinterest-p"></i>
          </Link>
        </div>

        <div className="humberger__menu__contact">
          <ul>
            <li>
              <i className="fa fa-envelope"></i> hello@colorlib.com
            </li>
            <li>Free Shipping for all Order of $99</li>
          </ul>
        </div>
      </div>

      <header className="header">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="header__top__left">
                  <ul>
                    <li>
                      <i className="fa fa-envelope"></i>{" "}
                      hello@organicKashmir.com
                    </li>
                    <li>Free Shipping for all Order of Rs 499/=</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="header__top__right">
                  <div className="header__top__right__social">
                    <Link to="#">
                      <i className="fa fa-facebook"></i>
                    </Link>
                    <Link to="#">
                      <i className="fa fa-twitter"></i>
                    </Link>
                    <Link to="#">
                      <i className="fa fa-linkedin"></i>
                    </Link>
                    <Link to="#">
                      <i className="fa fa-pinterest-p"></i>
                    </Link>
                  </div>
                  <div className="header__top__right__auth">
                    <Link to="/login">
                      <i className="fa fa-user"></i> Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="header__logo">
                <Link to="/">
                  <img src="img/logo.png" alt="" />
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <nav className="header__menu">
                <ul>
                  <li className="active">
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/shop">Shop</Link>
                  </li>

                  <li>
                    <Link to="/posts">Blog</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link to="">Delivery</Link>
                    <ul className="header__menu__dropdown">
                      <li>
                        <Link to="/user/cart">Shoping Cart</Link>
                      </li>
                      <li>
                        <Link to="/orders">Orders</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="col-lg-3">
              <div className="header__cart">
                <ul>
                  <li>
                    <Link to="/user/cart">
                      <i className="fa fa-shopping-bag"></i>{" "}
                      <span>{cart.products ? cart.products.length : 0}</span>
                    </Link>
                  </li>
                </ul>
              
              </div>
            </div>
          </div>

          {/* Hamburger Icon */}
          <div className="humberger__open" onClick={toggleMenu}>
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
