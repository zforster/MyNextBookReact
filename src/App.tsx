import { AppShell, MantineProvider } from "@mantine/core";
import { HeaderBanner } from "./components/header";
import { Notifications } from "@mantine/notifications";
import { ReactNode } from "react";

interface AppProps {
  children: ReactNode;
}

const App = ({ children }: AppProps) => {
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
