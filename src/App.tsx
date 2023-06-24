import { AppShell, MantineProvider, Navbar, Text } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ReactNode, useEffect } from "react";
import ReactGA from "react-ga4";

import { useState } from "react";
import { createStyles, Group, getStylesRef, rem } from "@mantine/core";
import { IconBook2 } from "@tabler/icons";

interface AppProps {
  children: ReactNode;
}

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
    { link: "", label: "New Recommendation", icon: IconBook2 },
  ].map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
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
          <a className={classes.title} href="/">
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

const App = ({ children }: AppProps) => {
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS as string);
  }, []);

  return (
    <MantineProvider
      theme={{ primaryColor: "gray" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Notifications position="top-right" />
      <AppShell navbar={<Nav />}>{children}</AppShell>
    </MantineProvider>
  );
};

export default App;
