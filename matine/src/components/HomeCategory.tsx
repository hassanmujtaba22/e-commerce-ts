import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  Grid,
  Box,
  Avatar,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: theme.spacing.xl * 3,
    paddingBottom: theme.spacing.xl * 3,
  },
  grid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    padding: "10px",
    borderRadius: "30px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "&:hover": {
      boxShadow: "6px 6px 11px -3px rgba(153,153,153,0.75)",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
    "& span": {
      display: "flex",
      alignItems: "center",
      avatar: {
        height: "auto",
      },
    },
  },
}));

export function HomeCategory({ categories }: any) {
  const { classes }: any = useStyles();
  return (
    <div className={classes.root}>
      <Container size="lg">
        <Grid className={classes.grid} columns={4}>
          {categories.map((category: any) => (
            <Grid.Col sm={2} md={1} lg={1}>
              <Box className={classes.card}>
                <span>
                  <Avatar
                    radius="xl"
                    className={classes.avatar}
                    src={category.imageURL}
                    alt={category.title}
                  />
                  {category.title}
                </span>
              </Box>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
