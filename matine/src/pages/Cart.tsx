import { ActionIcon, Button, Card, Container, createStyles, Grid, ScrollArea, Table, Text, TextInput } from '@mantine/core';
import { IconSquareX } from '@tabler/icons';
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
const useStylesDiscountInput = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 18,
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));
interface TableScrollAreaProps {
  data: { name: string; email: string; company: string }[];
}
function Cart() {
  const { classes: classesDiscountInput } = useStylesDiscountInput();
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
      <td>
        <ActionIcon
          variant="subtle"
          sx={{ color: "black" }}
          onClick={() => dispatch(clearProductFromCart(product))}
        >
          <IconSquareX size={20} />
        </ActionIcon>
      </td>
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
                  <th></th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </ScrollArea>
        </Grid.Col>
        <Grid.Col xs={3} sm={3} md={1} lg={1}>
          <Card shadow="sm" p="lg" radius="md" withBorder sx={{ minWidth: "100%", height: "100%", background: "#F5F5F5" }}>
            <ScrollArea sx={{ height: 300 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
              <Table sx={{ minWidth: "100%" }}>
                <thead>
                  <tr>
                    <th colSpan={2}>Cart Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sub Total:</td>
                    <td>Rs.{cart.total}</td>
                  </tr>
                  <tr>
                    <td>Discount:</td>
                    <td>Rs.{calculateDiscount()}</td>
                  </tr>
                  <tr>
                    <td>Total:</td>
                    <td>Rs.{cart.total - calculateDiscount()}</td>
                  </tr>
                </tbody>
              </Table>
            </ScrollArea>
            <TextInput label="Discount Code" placeholder="Enter code to get discount" classNames={classesDiscountInput}
              value={code} onChange={(e) => setCode(e.target.value)}
            />
            <Button variant="light" sx={{marginTop: 10, width: "100%"}} color="indigo" onClick={() =>
              apply_discount_code(dispatch, code).then((res: any) =>
                setPackage(res)
              )
            }>
              Apply Code
            </Button>
            <Button color="red" sx={{marginTop: 10, width: "100%"}} component={Link} to="/checkout">
              PROCEED TO CHECKOUT
            </Button>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default Cart