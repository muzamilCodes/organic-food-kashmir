import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';

const Shop = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className="product spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-5"></div>
          <div className="col-lg-9 col-md-7">
            <div className="filter__item">
              <div className="row">
                <div className="col-lg-4 col-md-5"></div>
                <div className="col-lg-4 col-md-4">
                  {loading ? (
                    <h6>Loading products...</h6>
                  ) : error ? (
                    <h6 className="text-danger">{error}</h6>
                  ) : products.length === 0 ? (
                    <h6>No products found</h6>
                  ) : (
                    <h6><span>{products.length}</span> Products found</h6>
                  )}
                </div>
              </div>
              <div className="col-lg-4 col-md-3">
                <div className="filter__option">
                  <span className="icon_grid-2x2"></span>
                  <span className="icon_ul"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {products.map((product) => (
            <div className="col-lg-4 col-md-6 col-sm-6" key={product._id}>
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  style={{
                    backgroundImage: product.productImgUrls && product.productImgUrls.length > 0
                      ? `url(${product.productImgUrls[0]})`
                      : "none"
                  }}
                >
                  <ul className="product__item__pic__hover">
                    <li>
                      <button type="button" className="btn btn-link p-0 border-0 bg-transparent">
                        <i className="fa fa-heart"></i>
                      </button>
                    </li>
                    <li>
                      <button type="button" className="btn btn-link p-0 border-0 bg-transparent">
                        <i className="fa fa-retweet"></i>
                      </button>
                    </li>
                    <li>
                      <Link to="/user/cart">
                        <i className="fa fa-shopping-cart"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </h6>
                  <h5>Rs {product.price}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;
