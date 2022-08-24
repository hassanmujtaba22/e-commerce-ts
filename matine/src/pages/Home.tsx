import { Container, Grid, Text } from "@mantine/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Banner } from "../components/Banner";
import { HomeCategory } from "../components/HomeCategory";
import HomeProducts from "../components/HomeProducts";
import { ProductCard } from "../components/ProductCard";
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
      {
        !isFetching && categories.map((cat: any)=> (
          <div key={cat._id}>
            <HomeProducts cat={cat} />
          </div>
        ))
      }
      
    </>
  );
}

export default Home;
