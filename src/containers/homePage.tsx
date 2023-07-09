import {
  Container,
  Loader,
  Center,
  Text,
  Image,
  TextInput,
  Title,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import {
  useGetRecommendationsFromTextMutation,
  useGetLatestQuery,
} from "../apis/recommendation";
import { useState } from "react";
import { getHotkeyHandler } from "@mantine/hooks";
import ReactGA from "react-ga4";
import { useMediaQuery } from "@mantine/hooks";
import GoogleBooksAttribution from "../assets/poweredby.png";
import { Book } from "../datatypes/recommendation";
import { DateTime } from "luxon";

const HomePage = () => {
  const isMobile = useMediaQuery("(max-width: 70em)");

  const [textValue, setTextValue] = useState("");

  const [
    getRecommendations,
    { data: searchResults, isLoading, isError, isUninitialized },
  ] = useGetRecommendationsFromTextMutation();

  const { data: latestData, isLoading: isLatestLoading } = useGetLatestQuery(
    null,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const getReadableDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return DateTime.fromISO(
      new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()
    ).toRelative();
  };

  const shouldRenderLatest =
    !isLatestLoading && isUninitialized && latestData !== undefined;

  const formatNames = (names: string[]) => {
    switch (names.length) {
      case 2:
        return names.join(" & ");
      default:
        return names[0];
    }
  };

  const convertCapitalToCamelCase = (input: string) => {
    return input
      .toLowerCase()
      .split(" ")
      .reduce((titleCase, word) => {
        return titleCase + word.charAt(0).toUpperCase() + word.slice(1) + " ";
      }, "")
      .trim();
  };

  const bookRender = (book: Book, recommendationId: string, index: number) => (
    <Container
      miw="220px"
      maw="220px"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isMobile ? "center" : "start",
        justifyContent: isMobile ? "center" : "start",
      }}
    >
      <Image
        onClick={() =>
          window.open(`/#/recommendation/${recommendationId}/${index}`, "_self")
        }
        sx={{
          "&:hover": {
            opacity: "0.8",
            cursor: "pointer",
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
      <Text align={isMobile ? "center" : "left"}>
        {convertCapitalToCamelCase(book.title)}
      </Text>
      {book.authors.length > 0 && (
        <Text size="sm" align={isMobile ? "center" : "left"}>
          {convertCapitalToCamelCase(formatNames(book.authors))}
        </Text>
      )}
    </Container>
  );

  return (
    <Container>
      <Container
        py={isMobile ? "xs" : "sm"}
        px={isMobile ? "0" : "md"}
        style={{ display: "flex", alignItems: "center" }}
      >
        <TextInput
          style={{ flex: 1 }}
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
          placeholder="Search Books"
        />
        {!isMobile && (
          <Image
            alt={"GoogleBooksAttribution"}
            src={GoogleBooksAttribution}
            width={49}
            height={24}
            pl="md"
          />
        )}
      </Container>
      {isLoading && (
        <Container>
          <Center
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            py={isMobile ? "xl" : "md"}
          >
            <Loader size={"md"} color="#71717a" />
            <Text
              size={isMobile ? "sm" : "md"}
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
      {isLatestLoading && (
        <Container>
          <Center
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            py={isMobile ? "xl" : "md"}
          >
            <Loader size={"md"} color="#71717a" />
          </Center>
        </Container>
      )}
      {shouldRenderLatest && (
        <Container mx={0} px={isMobile ? 0 : "md"}>
          <Title pt="xs" size={isMobile ? "h3" : "h2"}>
            Latest Recommendations
          </Title>
          <Text size={isMobile ? "sm" : "md"} pb="sm">
            {getReadableDate(latestData.timestamp)}
            {" - "}
            {latestData?.userInput}
          </Text>
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
          maxWidth: "none",
        }}
        py="xl"
      >
        {shouldRenderLatest &&
          latestData?.books.map((book: Book, index: number) =>
            bookRender(book, latestData.recommendationId, index)
          )}
        {!isLoading &&
          searchResults?.books.map((book: Book, index: number) =>
            bookRender(book, searchResults.recommendationId, index)
          )}
      </Container>
    </Container>
  );
};

export default HomePage;
