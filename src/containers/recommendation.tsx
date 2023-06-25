import {
  Button,
  Center,
  Container,
  Divider,
  Image,
  Loader,
  Text,
  Title,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import {
  useLazyGetReasonQuery,
  useLazyGetSummaryQuery,
  useLazyFetchRecommendationByIdQuery,
} from "../apis/recommendation";
import { useEffect } from "react";

const Recommendation = () => {
  const { id, bookIndex } = useParams();

  const [
    getRecommendationQuery,
    {
      data: recommendation,
      isFetching: isFetchingRecommendation,
      isUninitialized: isRecommendationUninitalized,
    },
  ] = useLazyFetchRecommendationByIdQuery();

  const [getReasonQuery, { data: reason, isFetching: isFetchingReason }] =
    useLazyGetReasonQuery();

  const [getSummaryQuery, { data: summary, isFetching: isFetchingSummary }] =
    useLazyGetSummaryQuery();

  useEffect(() => {
    if (id !== undefined && bookIndex !== undefined) {
      getReasonQuery({ recommendationId: id, index: bookIndex });
    }
  }, [getReasonQuery, id, bookIndex]);

  useEffect(() => {
    if (id !== undefined && bookIndex !== undefined) {
      getSummaryQuery({ recommendationId: id, index: bookIndex });
    }
  }, [getSummaryQuery, id, bookIndex]);

  useEffect(() => {
    if (
      isRecommendationUninitalized &&
      id !== undefined &&
      bookIndex !== undefined
    ) {
      getRecommendationQuery(id);
    }
  }, [getRecommendationQuery, isRecommendationUninitalized, id, bookIndex]);

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

  if (isFetchingReason || isFetchingSummary || isFetchingRecommendation) {
    return (
      <Container>
        <Center
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          py="xl"
        >
          <Loader size="md" color="#71717a" />
        </Center>
      </Container>
    );
  }
  if (
    reason !== undefined &&
    summary !== undefined &&
    recommendation !== undefined &&
    bookIndex !== undefined
  ) {
    const book = recommendation?.books[parseInt(bookIndex)];
    const bookTitle = convertCapitalToCamelCase(book.title);
    return (
      <Container>
        <Title pt="xl" size="h2">
          {bookTitle}
        </Title>
        {book.authors && (
          <Text pb="sm">
            {convertCapitalToCamelCase(formatNames(book.authors))}
          </Text>
        )}
        <Divider pb="xl" />

        <Container style={{ display: "flex" }} px="0" pb="xl">
          <Container
            pl="0"
            pr="xl"
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Image
              onClick={() =>
                window.open(
                  `https://amazon.com/${book.amazonSearchUrl}&tag=pagepundit-20`,
                  "_blank"
                )
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
              width={128 * 1.1}
              height={192 * 1.1}
              mb={"sm"}
            />
            <Button
              onClick={() =>
                window.open(
                  `https://amazon.com/${book.amazonSearchUrl}&tag=pagepundit-20`,
                  "_blank"
                )
              }
              className="gradient-button"
              style={{
                background:
                  "linear-gradient(60deg, #16b576, #5073b8, #1098ad, #07b39b, #6fba82)",
                animation: "gradientAnimation 3.5s ease infinite alternate",
                backgroundSize: "300% 300%",
              }}
            >
              Find on Amazon
            </Button>
          </Container>

          <Container px="0">
            <Title pb="xs" size="h5">
              What is {bookTitle} about?
            </Title>
            <Text size="md">{summary?.data}</Text>

            <Title pt="lg" pb="xs" size="h5">
              Why we think you'll enjoy {book.title}
            </Title>
            <Text size="md">{reason?.data}</Text>
          </Container>
        </Container>

        <Divider pb="md" />

        <Container px="0">
          <Title pb="xs" size="h5">
            Other books we recommend
          </Title>
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
            py="md"
          >
            {recommendation?.books.map((book, index) => (
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
                  onClick={() =>
                    window.open(
                      `/#/recommendation/${recommendation.recommendationId}/${index}`,
                      "_self"
                    )
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
                <Text>{convertCapitalToCamelCase(book.title)}</Text>
                {book.authors && (
                  <Text size="sm">
                    {convertCapitalToCamelCase(formatNames(book.authors))}
                  </Text>
                )}
              </Container>
            ))}
          </Container>
        </Container>
      </Container>
    );
  }

  return null;
};

export default Recommendation;
