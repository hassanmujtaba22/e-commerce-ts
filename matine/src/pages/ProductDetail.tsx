import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/product-card";
import { get_product } from "../redux/action/product";
import { addProduct, addProductToCart } from "../redux/reducers/cartRedux";

function ProductDetail() {
  const [product, setProduct]: any = useState(null);
  const [productdata, setProductsdata] = useState([]);
  const { products, isFetching } = useSelector((state: any) => state.product);
  const cart = useSelector((state: any) => state.cart);
  const [qty, setQty] = useState(0);
  let { _id } = useParams();
  const dispatch = useDispatch();
  const fetchProductDetails = () => {
    get_product(_id).then(({ data }: any) => {
      setProduct(data);
      let productByCat = products.filter(
        (x: any) => x.category === data.category && x._id !== data._id
      );
      setProductsdata(productByCat);
    });
    let pro = cart.products.find((x: any) => x._id === _id);
    setQty(Number(pro?.quantity || 0));
  };
  useEffect(() => {
    fetchProductDetails();
  }, []);
  useEffect(() => {
    fetchProductDetails();
  }, [_id]);
  return (
    <div className="page-content">
      <div className="container">
        <div className="product-details-top">
          <div className="row">
            <div className="col-md-6">
              <div className="product-gallery product-gallery-vertical">
                <div className="row">
                  <figure className="product-main-image">
                    <img
                      id="product-zoom"
                      src={product?.imageURL}
                      data-zoom-image={product?.imageURL}
                      alt={product?.title}
                    />
                    <a
                      href="#"
                      id="btn-product-gallery"
                      className="btn-product-gallery"
                    >
                      <i className="icon-arrows" />
                    </a>
                  </figure>
                  {/* End .product-main-image */}
                </div>
                {/* End .row */}
              </div>
              {/* End .product-gallery */}
            </div>
            {/* End .col-md-6 */}
            <div className="col-md-6">
              <div className="product-details">
                <h1 className="product-title">{product?.title}</h1>
                {/* End .product-title */}
                <div className="product-price">Rs.{product?.price}</div>
                <div className="product-content">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product?.description,
                    }}
                  ></div>
                </div>
                {/* End .product-content */}
                <div className="details-filter-row details-row-size">
                  <label htmlFor="qty">Qty:</label>
                  <div className="product-details-quantity">
                    <input
                      type="number"
                      id="qty"
                      className="form-control"
                      defaultValue={1}
                      min={1}
                      step={1}
                      data-decimals={0}
                      required
                      value={qty}
                      onChange={(e: any) => setQty(e.target.value)}
                    />
                  </div>
                  {/* End .product-details-quantity */}
                </div>
                {/* End .details-filter-row */}
                <div className="product-details-action">
                  <button
                    onClick={() =>
                      dispatch(
                        addProductToCart({ ...product, quantity: Number(qty) })
                      )
                    }
                    className="btn-product btn-cart"
                  >
                    <span>add to cart</span>
                  </button>
                </div>
                {/* End .product-details-action */}
                <div className="product-details-footer">
                  {/* End .product-cat */}
                  <div className="social-icons social-icons-sm">
                    <span className="social-label">Share:</span>
                    <a
                      href="#"
                      className="social-icon"
                      title="Facebook"
                      target="_blank"
                    >
                      <i className="icon-facebook-f" />
                    </a>
                    <a
                      href="#"
                      className="social-icon"
                      title="Twitter"
                      target="_blank"
                    >
                      <i className="icon-twitter" />
                    </a>
                    <a
                      href="#"
                      className="social-icon"
                      title="Instagram"
                      target="_blank"
                    >
                      <i className="icon-instagram" />
                    </a>
                    <a
                      href="#"
                      className="social-icon"
                      title="Pinterest"
                      target="_blank"
                    >
                      <i className="icon-pinterest" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {productdata.length > 0 && (
          <>
            <h2 className="title text-center mb-4">You May Also Like</h2>
            <div className="row">
              {productdata.map((item: any) => (
               <div
               key={item._id}
               className="col-xl-5col col-lg-3 col-md-4 col-6"
               style={{ minHeight: "300px" }}
             >
               <ProductCard item={item} />
             </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
