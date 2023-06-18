import {
  Textarea,
  Container,
  Loader,
  Center,
  Text,
  Image,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { useGetRecommendationsFromTextMutation } from "../apis/recommendation";
import { useState } from "react";
import { getHotkeyHandler } from "@mantine/hooks";
import ReactGA from "react-ga4";

const Home = () => {
  const [textValue, setTextValue] = useState("");

  const [getRecommendations, { data: searchResults, isLoading, isError }] =
    useGetRecommendationsFromTextMutation();

  const formatNames = (names: string[]) => {
    switch (names.length) {
      case 2:
        return names.join(" & ");
      default:
        return names[0];
    }
  };

  return (
    <Container>
      <Container>
        <Textarea
          error={isError && "Sorry, something went wrong"}
          onKeyDown={getHotkeyHandler([
            [
              "Enter",
              () => {
                ReactGA.event({
                  category: "Book Recommendation",
                  action: "Search",
                  label: textValue,
                });
                !isLoading && getRecommendations(textValue);
              },
            ],
          ])}
          rightSection={isLoading ? <Loader color="#71717a" size="xs" /> : null}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          size={"sm"}
          iconWidth={40}
          icon={<IconSearch size={20} />}
          maxRows={3}
          pt="sm"
          autosize={true}
          placeholder="Tell us about the book you are looking for. E.g. 'Books about the impact of artificial intelligence'."
        />
      </Container>
      {isLoading && (
        <Container>
          <Center
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            py="xl"
          >
            <Loader size="md" color="#71717a" />
            <Text
              align="center"
              pt="sm"
              color="#71717a"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              Please wait while we find suitable books! <br /> This can take up
              to 30 seconds
            </Text>
          </Center>
        </Container>
      )}
      <Container
        style={{
          display: "grid",
          justifyItems: "start",
          alignItems: "start",
          gridAutoColumns: "1fr",
          gridColumnGap: "2rem",
          gridRowGap: "4rem",
          gridTemplateColumns: "repeat(auto-fit,minmax(11em,1fr))",
          gridTemplateRows: "auto",
        }}
        pt={"80px"}
      >
        {searchResults?.books.map((book) => (
          <a
            target="_blank"
            key={book.title}
            href={`https://amazon.com/${book.amazonSearchUrl}&tag=pagepundit-20`}
            style={{ textDecoration: "none", color: "black" }}
            rel="noreferrer"
          >
            <Container
              miw="220px"
              maw="220px"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "start",
              }}
            >
              <Image
                sx={{
                  "&:hover": {
                    opacity: "0.8",
                  },
                }}
                style={{
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 4px 24px",
                }}
                alt={book.title}
                radius={"sm"}
                src={book.thumbnailUrl}
                width={128}
                height={192}
                mb={"sm"}
              />
              <Text>{book.title}</Text>
              <Text size="sm">{book.authors && formatNames(book.authors)}</Text>
            </Container>
          </a>
        ))}
      </Container>
    </Container>
  );
};

export default Home;
