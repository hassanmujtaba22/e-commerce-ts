import { useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Image,
  Box,
  Autocomplete,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DarsiLogo from "../assets/darsi-logo.png";
import { ColorSchemeToggler } from "./ColorSchemeToggler";
import { IconSearch, IconShoppingCart } from "@tabler/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HEADER_HEIGHT = 60;

const useStyles: any = createStyles((theme) => ({
  root: {
    position: "sticky",
    zIndex: 1,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    width: "100%",
    margin: "0 auto",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
}));

interface HeaderResponsiveProps {
  links: { link: string; label: string }[];
}

export function HeaderResponsive({ links }: HeaderResponsiveProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();
  const user = useSelector((state: any) => state.user.currentUser);
  const cart = useSelector((state: any) => state.cart);
  const { products } = useSelector((state: any) => state.product);
  const items = links.map((link) => (
    <Link
      to={link.link}
      key={link.label}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
    >
      {link.label}
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
     <Container size="lg">
     <Box className={classes.header}>
        <Link to="/">
          <Image src={DarsiLogo} width={60} />
        </Link>
        <Group spacing={5} className={classes.links}>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size={16} stroke={1.5} />}
            data={[
              "React",
              "Angular",
              "Vue",
              "Next.js",
              "Riot.js",
              "Svelte",
              "Blitz.js",
            ]}
          />
          {items}
          {/* <ColorSchemeToggler /> */}
          <ActionIcon
            variant="subtle"
            sx={{ color: "black"}}
            component={Link}
            to="/cart"
          >
            <IconShoppingCart size={20} />
          </ActionIcon>
          <span>{cart.quantity}</span>
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Box>
     </Container>
    </Header>
  );
}
