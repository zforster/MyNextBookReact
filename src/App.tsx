import { MantineProvider, Loader } from "@mantine/core";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { Center } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";

// apis
import { useGetRecommendationsFromTextMutation } from "./apis/recommendation";
import { useState } from "react";
import { Grid, Container } from "@mantine/core";
import Book from "./components/book";

const App = () => {
  const [value, setValue] = useState("");

  const [
    getRecommendations,
    {
      isLoading: loadingRecommendations,
      isError: recommendationError,
      data: recommendationData,
    },
  ] = useGetRecommendationsFromTextMutation();

  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Center>
        <Input.Wrapper
          error={recommendationError && "Something went wrong"}
          style={{
            maxWidth: "720px",
            width: "720px",
            marginTop: "350px",
          }}
        >
          <Input
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={getHotkeyHandler([
              ["Enter", () => getRecommendations(value)],
            ])}
            icon={<IconSearch />}
            rightSection={loadingRecommendations ? <Loader size="xs" /> : null}
            placeholder="Tell us about the book you're looking for. You can enter a description, keywords, or similar books!"
          />
        </Input.Wrapper>
      </Center>
      <Container fluid style={{ marginTop: "50px" }}>
        <Grid align="center" style={{ justifyContent: "center" }}>
          {recommendationData?.map((recommendation) => (
            <Book recommendation={recommendation} />
          ))}
        </Grid>
      </Container>
    </MantineProvider>
  );
};

export default App;
