import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_products } from "../../redux/action/product";

function NewArrival() {
  const dispatch = useDispatch();
  useEffect(() => {
    get_products(dispatch);
  }, []);
  const { products, isFetching } = useSelector((state: any) => state.product);
  return (
    <div className="container new-arrivals">
      <hr className="mb-5 mt-8" />
      <div className="heading heading-center mb-3">
        <h2 className="title">Latest Products</h2>
      </div>
      <div className="row">
        {!isFetching
          ? products.map((item: any) => (
              <div className="col-xl-5col col-lg-3 col-md-4 col-6">
                <div className="product demo21 m-0">
                  <figure className="product-media">
                    <a href="product.html">
                      <img
                        src={item.imageURL}
                        alt="Product image"
                        className="product-image"
                      />
                    </a>
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body text-center">
                    <div className="product-cat">
                      <a href="#">{item.title}</a>
                    </div>
                    {/* End .product-cat */}
                    <div className="product-price">
                      <span className="cur-price">RS. {item.price}</span>
                    </div>
                    {/* End .product-price */}
                    <div className="product-action">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>
                          {item.stockCountPending > 0
                            ? "Add To Cart"
                            : "Out of Stock"}
                        </span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default NewArrival;
