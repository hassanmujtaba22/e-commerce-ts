import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../components/product-card";
import { get_products } from "../redux/action/product";
import { addProduct } from "../redux/reducers/cartRedux";

function Products() {
  const dispatch = useDispatch();
  useEffect(() => {
    get_products(dispatch);
  }, []);
  const { products, isFetching } = useSelector((state: any) => state.product);
  return (
    <>
      <div className="container new-arrivals">
      <div className="heading heading-center mb-3">
        <h2 className="title">All Products</h2>
      </div>
      <div className="row">
        {!isFetching
          ? products.map((item: any) => (
            <div
            key={item._id}
            className="col-xl-5col col-lg-3 col-md-4 col-6"
            style={{ minHeight: "300px" }}
          >
            <ProductCard item={item} />
          </div>
          ))
          : null}
      </div>
    </div>
    </>
  );
}

export default Products;
