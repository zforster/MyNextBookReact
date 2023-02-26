import { Loader } from "@mantine/core";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { Center } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";

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

  return (
    <Center>
      <Input.Wrapper
        error={isError && "Something went wrong"}
        style={{
          maxWidth: "720px",
          width: "720px",
        }}
      >
        <Input
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={getHotkeyHandler([
            ["Enter", () => getRecommendations(value)],
          ])}
          icon={<IconSearch />}
          rightSection={isLoading ? <Loader size="xs" /> : null}
          placeholder="Tell us about the book you're looking for. You can enter a description, keywords, or similar books!"
        />
      </Input.Wrapper>
    </Center>
  );
};

export default Search;
