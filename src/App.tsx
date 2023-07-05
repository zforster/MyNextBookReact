import { AppShell, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ReactNode, useEffect } from "react";
import ReactGA from "react-ga4";
import Nav from "./components/nav";
import { useMediaQuery } from "@mantine/hooks";
import { HeaderBanner } from "./components/header";

interface AppProps {
  children: ReactNode;
}

const App = ({ children }: AppProps) => {
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS as string);
  }, []);

  const isMobile = useMediaQuery("(max-width: 70em)");

  return (
    <MantineProvider
      theme={{ primaryColor: "gray" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Notifications position="top-right" />
      <AppShell
        navbar={isMobile ? undefined : <Nav />}
        header={isMobile ? <HeaderBanner /> : undefined}
      >
        {children}
      </AppShell>
    </MantineProvider>
  );
};

export default App;
