import { ActionIcon, Button, Card, Container, createStyles, Grid, ScrollArea, Table, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSquareX } from '@tabler/icons';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { QuantityInput } from '../components/QuantityInput';
import { createOrder } from '../redux/action/create_order';
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
  const navigate = useNavigate();
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
  const form = useForm({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      city: "",
      postalCode: "",
      address: ""
    },
  });

  const handleSubmit = async (values: any) => {
    let cartData: any = {};
    cartData.products = cart.products.map((x: any) => ({
      productId: x._id,
      vendor: x.vendor,
      title: x.title,
      profitMargin: x.profitMargin,
      productCode: x.productCode,
      price: x.price,
      vendorPrice: x.vendorPrice,
      qty: x.quantity,
      stockCountPending: x.stockCountPending,
      stockCountConsumed: x.stockCountConsumed,
      totalSale: x.totalSale,
    }));
    if (cart.code) {
      cartData.applied_Referral_Code = cart.code;
    }
    if (user) {
      cartData.user = user._id;
    }
    cartData.name = values.fname + " " + values.lname;
    cartData.email = values.email;
    cartData.address = values.address;
    cartData.city = values.city;
    cartData.postalCode = values.postalCode;
    cartData.phone = values.phone;
    console.log(cartData);
    
    createOrder(cartData)
      .then((res: any) => {
        if (res.status === 200) {
          alert(res.data.message);
          dispatch(clear_cart());
          navigate("/");
        } else {
          alert(res.data.message);
        }
      })
      .catch((error: any) => alert(error));

  }
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
        Billing Informotion
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>

      <Grid columns={3}>
        <Grid.Col xs={3} sm={3} md={2} lg={2}>
            <TextInput
              withAsterisk
              label="First Name"
              placeholder="Enter Your First Name"
              {...form.getInputProps('firstname')}
            />
            <TextInput
              withAsterisk
              label="Last Name"
              placeholder="Enter Your Last Name"
              {...form.getInputProps('lastname')}
            />
            <TextInput
              withAsterisk
              label="Email"
              placeholder="Enter Your Email"
              {...form.getInputProps('email')}
            />
            <TextInput
              withAsterisk
              label="Phone"
              placeholder="Enter Your Phone"
              {...form.getInputProps('phone')}
            />
            <TextInput
              withAsterisk
              label="City"
              placeholder="Enter Your City"
              {...form.getInputProps('city')}
            />
            <TextInput
              withAsterisk
              label="Postcode / Zip"
              placeholder="Enter Your Postcode / Zip"
              {...form.getInputProps('postalCode')}
            />
            <TextInput
              withAsterisk
              label="Street address"
              placeholder="Enter Your Street address"
              {...form.getInputProps('address')}
            />
        </Grid.Col>
        <Grid.Col xs={3} sm={3} md={1} lg={1}>
          <Card shadow="sm" p="lg" radius="md" withBorder sx={{ minWidth: "100%", height: "100%", background: "#F5F5F5" }}>
            <ScrollArea sx={{ height: 300 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
              <Table sx={{ minWidth: "100%" }}>
                <thead>
                  <tr>
                    <th colSpan={2}>Cart Detail</th>
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
            <Button color="red" sx={{ marginTop: 10, width: "100%" }} type="submit">
              Proceed to Checkout
            </Button>
          </Card>
        </Grid.Col>
      </Grid>
      </form>
    </Container>
  )
}

export default Cart