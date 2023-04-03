import { MantineProvider } from "@mantine/core";

// apis
import { endpoints } from "./apis/recommendation";
import { Container } from "@mantine/core";
import Book from "./components/book";
import { HeaderBanner } from "./components/header";
import { useSelector } from "react-redux";

const App = () => {
  const { data } = useSelector(
    endpoints.getRecommendationsFromText.select("recommendation-search")
  );

  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <HeaderBanner />
      <Container fluid>
        {data?.map((recommendation) => (
          <Book recommendation={recommendation} />
        ))}
      </Container>
    </MantineProvider>
  );
};

export default App;
