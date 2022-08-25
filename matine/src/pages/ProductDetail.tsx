import { Button, Container, Divider, Grid, Image, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { get_product } from "../redux/action/product";
import { addProduct, addProductToCart } from "../redux/reducers/cartRedux";

function ProductDetail() {
  const [product, setProduct]: any = useState({});
  const [productdata, setProductsdata]: any = useState([]);
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
        Product Detail
      </Text>
      <Grid columns={3}>
        <Grid.Col xs={3} sm={3} md={1} lg={1}>
          <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
            <Image
              radius="md"
              src={product?.imageURL}
              alt="Random unsplash image"
            />
          </div>
        </Grid.Col>
        <Grid.Col xs={3} sm={3} md={2} lg={2}>
          <Text weight={600} size="xl" sx={{ lineHeight: 1, marginBottom: 20 }}>
            {product.title}
          </Text>
          <Text size="sm" sx={{ lineHeight: 1, marginBottom: 20 }}>
            {product.description}
          </Text>
          <Text weight={600} size="xl" sx={{ lineHeight: 1, marginBottom: 20 }}>
            Rs.{product.price}
          </Text>
          <Button color="red" sx={{ marginTop: 10, }}  onClick={() => {
            if (product.stockCountPending > 0) {
              dispatch(addProduct({ ...product, quantity: 1 }));
            }
          }}>
              Add to Cart
            </Button>
        </Grid.Col>
        <Grid.Col lg={3}>
        <Divider my="xl" />
          <Text weight={600} size="xl" sx={{ lineHeight: 1, marginBottom: 20 }}>
            You May Also Like
          </Text>
          <Grid columns={6}>
            {productdata.map((product: any) => (
              <Grid.Col key={product._id} xs={3} sm={2} md={1} lg={1}>
                <ProductCard product={product} />
              </Grid.Col>
            ))}
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default ProductDetail;
