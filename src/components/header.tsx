import { useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
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
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    display: "none",
  },

  link: {
    display: "block",
    lineHeight: 1,
    textDecoration: "none",
    color: theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    borderRadius: 0,
    padding: theme.spacing.md,
    "&:hover": {
      backgroundColor: theme.colors.gray[0],
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
}));

export const HeaderBanner = () => {
  const links = [{ link: "/#/home", label: "New Recommendation" }];

  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        close();
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height={HEADER_HEIGHT}>
      <Container className={classes.header}>
        <Text size="xl" weight="500">
          PagePundit
        </Text>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
};

export default HeaderBanner;
