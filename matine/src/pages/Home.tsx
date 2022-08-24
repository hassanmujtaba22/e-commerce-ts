import { Container, Grid, Text } from "@mantine/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Banner } from "../components/Banner";
import { HomeCategory } from "../components/HomeCategory";
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
  const { products, isFetching: isFetchingProduct } = useSelector((state: any) => state.product);
  const getCatProducts = (id: string) => {
    let productByCat = products.filter((x: any) => x.category === id);
    return productByCat
  }
  return (
    <>
      <Banner />
      <HomeCategory categories={categories} />
      {
        !isFetching ? categories.map((cat: any, ci: number) => (
          <Container key={ci} size="lg">
            <Text weight={600} size="xl" sx={{ lineHeight: 1 }}>
              {cat.title}
            </Text>
            <Grid columns={6}>
              {getCatProducts(cat._id).map((product: any) => (
                <Grid.Col key={product._id} sm={2} md={1} lg={1}>
                  <ProductCard  product={product}/>
                </Grid.Col>
              ))}
            </Grid>
          </Container>
        )) : null}
    </>
  );
}

export default Home;
