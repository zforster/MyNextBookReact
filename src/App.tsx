import { MantineProvider } from "@mantine/core";

// apis
import { useGetRecommendationsFromTextMutation } from "./apis/recommendation";
import { Grid, Container, Text, Center } from "@mantine/core";
import Book from "./components/book";
import Search from "./components/search";
import { HeaderBanner } from "./components/header";
import { IconBook } from "@tabler/icons";
const App = () => {
  const [getRecommendations, { isLoading, isError, data }] =
    useGetRecommendationsFromTextMutation();

  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <HeaderBanner
        links={[
          { label: "Want to support the site? Buy us a coffee", link: "test" },
        ]}
      />
      <Center style={{ paddingBottom: "15px" }}>
        <Text
          c={"white"}
          style={{ paddingRight: "7px" }}
          weight={"bolder"}
          size={"xl"}
        >
          My Next Book
        </Text>
        <IconBook style={{ color: "white" }} size={30} />
      </Center>
      <Search
        isLoading={isLoading}
        isError={isError}
        getRecommendations={getRecommendations}
      />
      <Container fluid style={{ marginTop: "50px" }}>
        <Grid align="center" style={{ justifyContent: "center" }}>
          {data?.map((recommendation) => (
            <Book recommendation={recommendation} />
          ))}
        </Grid>
      </Container>
    </MantineProvider>
  );
};

export default App;
