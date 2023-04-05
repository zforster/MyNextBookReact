import { AppShell, MantineProvider } from "@mantine/core";

// apis
import { endpoints } from "./apis/recommendation";
import { Container } from "@mantine/core";
import Book from "./components/book";
import { HeaderBanner } from "./components/header";
import { useSelector } from "react-redux";
import Nav from "./components/nav";

const App = () => {
  const { data } = useSelector(
    endpoints.getRecommendationsFromText.select("recommendation-search")
  );

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
      <AppShell header={<HeaderBanner />} navbar={<Nav />}>
        <Container fluid>
          {data?.map((recommendation) => (
            <Book recommendation={recommendation} />
          ))}
        </Container>
      </AppShell>
    </MantineProvider>
  );
};

export default App;
