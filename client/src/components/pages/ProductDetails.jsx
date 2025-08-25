import React, { useEffect, useState } from "react";
import { featuredProductsArr } from "../../data/featuredProductsArr";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get(`/product/get/${productId}`);
      if (res.status === 200) {
        setProduct(res.data.payload);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCart = async (productId) => {
    try {
      const res = await axiosInstance.post(`/cart/addtoCart/${productId}`, {
        quantity,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <section className="product-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              {/* <div className="product__details__pic">


                                <div className="product__details__pic__item">
                                    <img className="product__details__pic__item--large"
                                        src={product.image} alt="" />
                                </div>


                                <div className="product__details__pic__slider owl-carousel">
                                    <img data-imgbigurl="img/product/details/product-details-2.jpg"
                                        src="img/product/details/thumb-1.jpg" alt="" />
                                    <img data-imgbigurl="img/product/details/product-details-3.jpg"
                                        src="img/product/details/thumb-2.jpg" alt="" />
                                    <img data-imgbigurl="img/product/details/product-details-5.jpg"
                                        src="img/product/details/thumb-3.jpg" alt="" />
                                    <img data-imgbigurl="img/product/details/product-details-4.jpg"
                                        src="img/product/details/thumb-4.jpg" alt="" />
                                </div>
                            </div> */}

              <img
                src={
                  product && product.productImgUrls && product.productImgUrls[0]
                }
                alt={product && product.name}
                width={500}
              />
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="product__details__text">
                <h3>{product && product.name}</h3>
                <div className="product__details__rating">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-half-o"></i>
                  <span>(18 reviews)</span>
                </div>

                <div className="product__details__price">
                  Rs {product && product.price} /=
                </div>

                <p>{product && product.description}</p>
                <div className="product__details__quantity">
                  <div className="quantity">
                    <div className="pro-qty">
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                          setQuantity(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  className="primary-btn"
                  onClick={() => {
                    handleCart(productId);
                  }}
                >
                  ADD TO CART
                </button>

                <a href="#" className="heart-icon">
                  <span className="icon_heart_alt"></span>
                </a>
                <ul>
                  <li>
                    <b>Availability</b>{" "}
                    {product.isAvailable ? (
                      <span className="text-success"> In Stock </span>
                    ) : (
                      <span className="text-danger">Currently Unavailable</span>
                    )}{" "}
                  </li>

                  <li>
                    <b>Shipping</b>{" "}
                    <span>
                      01 day shipping. <samp>Free pickup today</samp>
                    </span>
                  </li>

                  <li>
                    <b>Weight</b>{" "}
                    <span> {product && product.sizes && product.sizes[0]}</span>
                  </li>

                  <li>
                    <b>Share on</b>
                    <div className="share">
                      <a href="#">
                        <i className="fa fa-facebook"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-pinterest"></i>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="product__details__tab">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#tabs-1"
                      role="tab"
                      aria-selected="true"
                    >
                      Description
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#tabs-2"
                      role="tab"
                      aria-selected="false"
                    >
                      Information
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#tabs-3"
                      role="tab"
                      aria-selected="false"
                    >
                      Reviews <span>(1)</span>
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <div className="product__details__tab__desc">
                      <h6>Products Infomation</h6>
                      {product && product.description}
                    </div>
                  </div>
                  <div className="tab-pane" id="tabs-2" role="tabpanel">
                    <div className="product__details__tab__desc">
                      <h6>Products Infomation</h6>
                      <p>
                        Vestibulum ac diam sit amet quam vehicula elementum sed
                        sit amet dui. Pellentesque in ipsum id orci porta
                        dapibus. Proin eget tortor risus. Vivamus suscipit
                        tortor eget felis porttitor volutpat. Vestibulum ac diam
                        sit amet quam vehicula elementum sed sit amet dui. Donec
                        rutrum congue leo eget malesuada. Vivamus suscipit
                        tortor eget felis porttitor volutpat. Curabitur arcu
                        erat, accumsan id imperdiet et, porttitor at sem.
                        Praesent sapien massa, convallis a pellentesque nec,
                        egestas non nisi. Vestibulum ac diam sit amet quam
                        vehicula elementum sed sit amet dui. Vestibulum ante
                        ipsum primis in faucibus orci luctus et ultrices posuere
                        cubilia Curae; Donec velit neque, auctor sit amet
                        aliquam vel, ullamcorper sit amet ligula. Proin eget
                        tortor risus.
                      </p>
                      <p>
                        Praesent sapien massa, convallis a pellentesque nec,
                        egestas non nisi. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Mauris blandit aliquet
                        elit, eget tincidunt nibh pulvinar a. Cras ultricies
                        ligula sed magna dictum porta. Cras ultricies ligula sed
                        magna dictum porta. Sed porttitor lectus nibh. Mauris
                        blandit aliquet elit, eget tincidunt nibh pulvinar a.
                      </p>
                    </div>
                  </div>
                  <div className="tab-pane" id="tabs-3" role="tabpanel">
                    <div className="product__details__tab__desc">
                      <h6>Products Infomation</h6>
                      <p>
                        Vestibulum ac diam sit amet quam vehicula elementum sed
                        sit amet dui. Pellentesque in ipsum id orci porta
                        dapibus. Proin eget tortor risus. Vivamus suscipit
                        tortor eget felis porttitor volutpat. Vestibulum ac diam
                        sit amet quam vehicula elementum sed sit amet dui. Donec
                        rutrum congue leo eget malesuada. Vivamus suscipit
                        tortor eget felis porttitor volutpat. Curabitur arcu
                        erat, accumsan id imperdiet et, porttitor at sem.
                        Praesent sapien massa, convallis a pellentesque nec,
                        egestas non nisi. Vestibulum ac diam sit amet quam
                        vehicula elementum sed sit amet dui. Vestibulum ante
                        ipsum primis in faucibus orci luctus et ultrices posuere
                        cubilia Curae; Donec velit neque, auctor sit amet
                        aliquam vel, ullamcorper sit amet ligula. Proin eget
                        tortor risus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="related-product">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title related__product__title">
                <h2>Related Product</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/product-1.jpg"
                >
                  <ul className="product__item__pic__hover">
                    <li>
                      <a href="#">
                        <i className="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>
                    <a href="#">Crab Pool Security</a>
                  </h6>
                  <h5>$30.00</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/product-2.jpg"
                >
                  <ul className="product__item__pic__hover">
                    <li>
                      <a href="#">
                        <i className="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>
                    <a href="#">Crab Pool Security</a>
                  </h6>
                  <h5>$30.00</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/product-3.jpg"
                >
                  <ul className="product__item__pic__hover">
                    <li>
                      <a href="#">
                        <i className="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>
                    <a href="#">Crab Pool Security</a>
                  </h6>
                  <h5>$30.00</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg="img/product/product-7.jpg"
                >
                  <ul className="product__item__pic__hover">
                    <li>
                      <a href="#">
                        <i className="fa fa-heart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-retweet"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-shopping-cart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>
                    <a href="#">Crab Pool Security</a>
                  </h6>
                  <h5>$30.00</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
