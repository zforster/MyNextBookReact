import { Loader, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { Center } from "@mantine/core";
import { getHotkeyHandler, useMediaQuery } from "@mantine/hooks";
import ReactGA from "react-ga4";

// apis
import { useState } from "react";

const Search = ({
  getRecommendations,
  isError,
  isLoading,
}: {
  getRecommendations: (string: string) => void;
  isError: boolean;
  isLoading: boolean;
}) => {
  const [value, setValue] = useState("");

  const s = useMediaQuery("(max-width: 26em)");

  return (
    <Center>
      <Input.Wrapper
        error={isError && "Something went wrong"}
        style={{
          width: s ? "200px" : "320px",
        }}
      >
        <Input
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={getHotkeyHandler([
            [
              "Enter",
              () => {
                ReactGA.event({
                  category: "Book Reccomendation",
                  action: "Search",
                  label: value,
                });
                !isLoading && getRecommendations(value);
              },
            ],
          ])}
          icon={<IconSearch size={"20px"} />}
          rightSection={isLoading ? <Loader size="xs" /> : null}
          placeholder="Search PagePundit..."
        />
      </Input.Wrapper>
    </Center>
  );
};

export default Search;
