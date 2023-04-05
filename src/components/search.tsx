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
          maxWidth: "500px",
          width: "500px",
        }}
      >
        <Input
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={getHotkeyHandler([
            ["Enter", () => getRecommendations(value)],
          ])}
          icon={<IconSearch size={"20px"} />}
          rightSection={isLoading ? <Loader size="xs" /> : null}
          placeholder="Search MyNextBook..."
        />
      </Input.Wrapper>
    </Center>
  );
};

export default Search;
