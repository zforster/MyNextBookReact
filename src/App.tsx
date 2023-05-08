import { AppShell, MantineProvider } from "@mantine/core";
import { HeaderBanner } from "./components/header";
import { Notifications } from "@mantine/notifications";
import { ReactNode, useEffect } from "react";
import ReactGA from "react-ga4";

interface AppProps {
  children: ReactNode;
}

const App = ({ children }: AppProps) => {
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS as string);
  }, []);

  return (
    <MantineProvider
      theme={{
        primaryShade: 3,
        colorScheme: "dark",
        primaryColor: "teal",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Notifications position="top-right" />
      <AppShell header={<HeaderBanner />}>{children}</AppShell>
    </MantineProvider>
  );
};

export default App;
