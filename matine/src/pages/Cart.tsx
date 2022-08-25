import { Card, Container, createStyles, Grid, ScrollArea, Table, Text } from '@mantine/core';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { QuantityInput } from '../components/QuantityInput';
import { apply_discount_code } from '../redux/action/discount_code';
import { addProduct, addProductToCart, clearProductFromCart, clear_cart } from '../redux/reducers/cartRedux';
const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
        }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface TableScrollAreaProps {
  data: { name: string; email: string; company: string }[];
}
function Cart() {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const user = useSelector((state: any) => state.user.currentUser);
  const cart = useSelector((state: any) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const [code, setCode] = useState("");
  const [_package, setPackage]: any = useState({});
  const dispatch = useDispatch();
  const calculateDiscount = (): number => {
    let total = Number(cart.total)
    let vendorTotal = Number(cart.vendorTotal)
    let profit = total - vendorTotal
    let discount_percentage = Number(_package?.discount_percentage | 0)
    let netAmount = profit * discount_percentage / 100
    return netAmount
  }
  const rows = cart.products.map((product: any) => (
    <tr key={product._id}>
      <td width="100px">
        <img
          src={product.imageURL}
          style={{ width: "100%" }}
          alt="Product image"
        />
      </td>
      <td width="300px">
        {product.title}
      </td>
      <td >Rs.{product.price}</td>
      <td width="100px">
        <input type="number" id="qty" defaultValue={1} min={1} step={1} data-decimals={0} style={{ width: "100%" }}
          value={product.quantity}
          onChange={(e: any) => {
            dispatch(addProductToCart({ ...product, quantity: e.target.value }))
          }} />
        {/* <QuantityInput value={product.quantity} onChange={(e: any) => {
            dispatch(addProductToCart({ ...product, quantity: e.target.value }))
          }}/> */}
      </td>
      <td>Rs.{product.quantity * product.price}</td>
    </tr>
  ));
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
        Cart
      </Text>
      <Grid columns={3}>
        <Grid.Col xs={3} sm={3} md={2} lg={2}>
          <ScrollArea sx={{ height: 300 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table sx={{ minWidth: "100%" }}>
              <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </ScrollArea>
        </Grid.Col>
        <Grid.Col xs={3} sm={3} md={1} lg={1}>
          <Card shadow="sm" p="lg" radius="md" withBorder sx={{ minWidth: "100%", height: "100%" }}>
            <ScrollArea sx={{ height: 300 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
              <Table sx={{ minWidth: "100%" }}>
                <thead>
                  <tr>
                    <td>Cart Total</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Sub Total:</b></td>
                    <td>Rs.{cart.total}</td>
                  </tr>
                  <tr>
                    <td><b>Discount:</b></td>
                    <td>Rs.{calculateDiscount()}</td>
                  </tr>
                  <tr>
                    <td><b>Total:</b></td>
                    <td>Rs.{cart.total - calculateDiscount()}</td>
                  </tr>
                </tbody>
              </Table>
            </ScrollArea>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default Cart