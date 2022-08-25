import { Card, Image, Text, createStyles, ActionIcon } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../redux/reducers/cartRedux";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    height: 250,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    "&:hover": {
      boxShadow: "6px 6px 11px -3px rgba(153,153,153,0.75)",
      // backgroundColor:
      //   theme.colorScheme === "dark"
      //     ? theme.colors.dark[5]
      //     : theme.colors.gray[1],
    },
  },
  imageSection: {
    flex: 3,
    padding: "5px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textSection: {
    flex: 1,
    padding: "5px 16px",
  },
  image: {
    height: "100px !important",
    width: "100%",
    "& img": {
      width: "100%",
      height: "100px !important",
      objectFit: "contain",
    },
  },
  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: "uppercase",
  },
  footer: {
    flex: 1,
    width: "100% !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export function ProductCard({ product }: any) {
  const { classes }: any = useStyles();
  const dispatch = useDispatch();

  return (
    <Card radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>

        <Link to={`/product/${product._id}`}>
          <Image
            src={product.imageURL}
            className={classes.image}
            alt={product.title}
          />
        </Link>
      </Card.Section>
      <Card.Section className={classes.textSection}>
        <Link to={`/product/${product._id}`}>
          <Text size="xs" weight={500}>{`${product.title.slice(0, 30)}${product.title.length > 30 && "..."
            }`}</Text>
        </Link>
      </Card.Section>
      <Card.Section className={classes.footer}>
        <Text size="sm" weight={600} sx={{ lineHeight: 1, color: "orange" }}>
          Rs.{product.price}
        </Text>
        <ActionIcon
          sx={{ color: "orange" }}
          onClick={() => {
            if (product.stockCountPending > 0) {
              dispatch(addProduct({ ...product, quantity: 1 }));
            }
          }}
        >
          <IconShoppingCart size={18} />
        </ActionIcon>
      </Card.Section>
    </Card>
  );
}
