import { Container, Grid, Text } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import { ProductCard } from "./ProductCard";

function HomeProducts({ cat }: any) {
  const { products, isFetching: isFetchingProduct } = useSelector(
    (state: any) => state.product
  );
  const getCatProducts = (id: string) => {
    let productByCat = products.filter((x: any) => x.category === id);
    return productByCat;
  };
  if (getCatProducts(cat._id).length === 0) {
    return null;
  }
  return (
    <Container size="lg" sx={{marginBottom: 30, backgroundColor: 'white', padding: 20}}>
      <Text weight={600} size="xl" sx={{ lineHeight: 1, marginBottom: 20 }}>
        {cat.title}
      </Text>
      <Grid columns={6}>
        {getCatProducts(cat._id).map((product: any) => (
          <Grid.Col key={product._id} xs={3} sm={2} md={1} lg={1}>
            <ProductCard product={product} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}

export default HomeProducts;
