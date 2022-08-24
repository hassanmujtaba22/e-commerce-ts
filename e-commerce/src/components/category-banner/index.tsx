import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_categories } from "../../redux/action/category";

function CategoryBanner() {
  const dispatch = useDispatch();

  useEffect(() => {
    get_categories(dispatch);
  }, []);
  const { categories, isFetching } = useSelector(
    (state: any) => state.category
  );
  return (
    <div className="container category-banner">
      <div className="row">
        {!isFetching
          ? categories.map((item: any) => (
              <div className="col-lg-3 col-md-6 col-sm-6">
                <a href="category.html">
                  {/* <img src={item.imageURL} style={{width: '100%', height: '100%', objectFit: "container"}} /> */}
                </a>
                <div className="banner-content">
                  <a href="category.html">
                    <h3 className="category"> {item.title} </h3>
                  </a>
                  <a href="category.html" className="action">
                    SHOP NOW
                  </a>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default CategoryBanner;
