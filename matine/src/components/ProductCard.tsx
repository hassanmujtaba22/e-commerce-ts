import { Card, Image, Text, Group, Badge, createStyles, Center, Button } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  image: {
    // height: "100px !important",
    // width: "100%"
  },
  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: 'uppercase',
  },

  section: {
    padding: theme.spacing.md,
  },

  icon: {
    marginRight: 5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
  },
  btn: {
    flex: 1,
    background: "transparent",
    border: "1px solid orange",
    color: "orange",
    "&:hover": {
      border: "1px solid orange",
      background: "orange",
      color: "white",
    }
  }
}));


export function ProductCard({product}: any) {
  const { classes }: any = useStyles();

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={product.imageURL} className={classes.image} alt={product.title} />
      </Card.Section>
      <Group position="apart" mt="md">
      <Link to={`/product/${product._id}`}>
          <Text size="sm" weight={500}>{`${product.title.slice(0,30)} ${product.title.length>30 && "..."}`}</Text>
      </Link>
      </Group>
      <Card.Section className={classes.section}>
        <Group>
          <div>
            <Text size="sm" weight={600} sx={{ lineHeight: 1 }}>
              Rs.{product.price}
            </Text>
          </div>
          <Button className={classes.btn}>
            Add to cart
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}