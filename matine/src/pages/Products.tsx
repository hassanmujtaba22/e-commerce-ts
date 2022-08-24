import { Container, Grid, Text } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../components/ProductCard";
import { get_products } from "../redux/action/product";

function Products() {
  const dispatch = useDispatch();
  useEffect(() => {
    get_products(dispatch);
  }, []);
  const { products, isFetching } = useSelector((state: any) => state.product);
  return (
    <Container
      size="lg"
      sx={{
        marginBottom: 30,
        marginTop: 30,
        backgroundColor: "white",
        padding: 20,
      }}
    >
      <Text weight={600} size="xl" sx={{ lineHeight: 1, marginBottom: 20 }}>
        All Products
      </Text>
      <Grid columns={6}>
        {!isFetching &&
          products.map((product: any) => (
            <Grid.Col key={product._id} xs={3} sm={2} md={1} lg={1}>
              <ProductCard product={product} />
            </Grid.Col>
          ))}
      </Grid>
    </Container>
  );
}

export default Products;
