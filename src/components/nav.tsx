import { Navbar, Text } from "@mantine/core";

import { useState } from "react";
import { createStyles, Group, getStylesRef, rem } from "@mantine/core";
import { IconBook2 } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.colors.gray[2]}`,
  },

  title: {
    textDecoration: "none",
    color: "black",
  },

  link: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[8],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color: theme.colors.gray[7],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.black,
      },
    },
  },
}));

const Nav = () => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("New Recommendation");

  const links = [
    { link: "/#/home", label: "New Recommendation", icon: IconBook2 },
  ].map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
        window.open(item.link, "_self");
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar height={"100%"} width={{ sm: 280 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <a className={classes.title} href="/#/home">
            <Text size="xl" weight="500">
              PagePundit
            </Text>
          </a>
        </Group>
        {links}
      </Navbar.Section>
    </Navbar>
  );
};

export default Nav;
