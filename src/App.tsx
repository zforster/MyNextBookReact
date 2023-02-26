import { MantineProvider, Loader } from "@mantine/core";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { Center } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";

// apis
import { useGetRecommendationsFromTextMutation } from "./apis/recommendation";
import { useEffect, useState } from "react";

const App = () => {
  const [value, setValue] = useState("");

  const [
    getRecommendations,
    {
      isLoading: loadingRecommendations,
      isSuccess: recommendationsFetched,
      data: recommendationData,
    },
  ] = useGetRecommendationsFromTextMutation();

  useEffect(() => {
    if (recommendationsFetched) {
      console.log(recommendationData);
    }
  });
  console.log(value);
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Center>
        <Input
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={getHotkeyHandler([
            ["Enter", () => getRecommendations(value)],
          ])}
          style={{ maxWidth: "720px", width: "720px", marginTop: "350px" }}
          icon={<IconSearch />}
          rightSection={loadingRecommendations ? <Loader size="xs" /> : null}
          placeholder="Tell us about the book you're looking for. You can enter a description, keywords, or similar books!"
        />
      </Center>
    </MantineProvider>
  );
};

export default App;
