import {
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

  const [
    getReasonQuery,
    {
      data: reason,
      isFetching: isFetchingReason,
      isUninitialized: isReasonUninitalized,
    },
  ] = useLazyGetReasonQuery();

  const [
    getSummaryQuery,
    {
      data: summary,
      isFetching: isFetchingSummary,
      isUninitialized: isSummaryUninitalized,
    },
  ] = useLazyGetSummaryQuery();

  useEffect(() => {
    if (isReasonUninitalized && id !== undefined && bookIndex !== undefined) {
      getReasonQuery({ recommendationId: id, index: bookIndex });
    }
  }, [getReasonQuery, isReasonUninitalized, id, bookIndex]);

  useEffect(() => {
    if (isSummaryUninitalized && id !== undefined && bookIndex !== undefined) {
      getSummaryQuery({ recommendationId: id, index: bookIndex });
    }
  }, [getSummaryQuery, isSummaryUninitalized, id, bookIndex]);

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

  {
    /* <a */
  }
  //   target="_blank"
  //   key={book.title}
  //   href={`https://amazon.com/${book.amazonSearchUrl}&tag=pagepundit-20`}
  //   style={{ textDecoration: "none", color: "black" }}
  //   rel="noreferrer"
  // ></a>

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
        <Divider pb="md" />

        <Container style={{ display: "flex" }} px="0">
          {/* <Container px="0">
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
              width={128}
              height={192}
              mb={"sm"}
            />
          </Container> */}

          <Container px="0">
            <Title pb="xs" size="h5">
              What is {bookTitle} about?
            </Title>
            <Text size="md">{summary?.data}</Text>

            <Title pt="xl" pb="xs" size="h5">
              Why will you enjoy {book.title}?
            </Title>
            <Text size="md">{reason?.data}</Text>
          </Container>
        </Container>
      </Container>
    );
  }

  return null;
};

export default Recommendation;
