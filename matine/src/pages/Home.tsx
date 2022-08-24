import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Banner } from "../components/Banner";
import { HomeCategory } from "../components/HomeCategory";
import { get_categories } from "../redux/action/category";
import { get_products } from "../redux/action/product";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    get_categories(dispatch);
    get_products(dispatch);
  }, []);

  const { categories, isFetching } = useSelector(
    (state: any) => state.category
  );
  return (
    <>
      <Banner />
      <HomeCategory categories={categories} />
    </>
  );
}

export default Home;
