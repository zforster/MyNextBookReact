import {
  ActionIcon,
  Button,
  Center,
  Container,
  Divider,
  Image,
  Loader,
  Menu,
  Text,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useParams } from "react-router-dom";
import {
  useLazyGetReasonQuery,
  useLazyGetSummaryQuery,
  useLazyFetchRecommendationByIdQuery,
} from "../apis/recommendation";
import { useEffect, useState } from "react";
import { IconCopy, IconDotsVertical } from "@tabler/icons";

const Recommendation = () => {
  const { id, bookIndex } = useParams();
  const [openMenu, setOpenMenu] = useState(false);

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
        <Container
          px={0}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Menu opened={openMenu} onChange={setOpenMenu}>
            <Menu.Target>
              <ActionIcon size="sm">
                <IconDotsVertical />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location}`);

                  notifications.show({
                    title: "Success",
                    message: "Link Copied!",
                  });
                }}
                icon={<IconCopy size={14} />}
              >
                Copy Link
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  const hostname = window.location.hostname;
                  const protocol =
                    hostname === "localhost" ? "http://" : "https://";

                  const markdown = recommendation?.books.reduce(
                    (markdown, book, index) => {
                      const authors = book.authors.join(" & ");
                      const bookMarkdown = `[${book.title}](${protocol}${hostname}/#/recommendation/${recommendation.recommendationId}/${bookIndex}) - By ${authors}.`;
                      return markdown + "\n\n" + bookMarkdown;
                    },
                    ""
                  );

                  navigator.clipboard.writeText(markdown);
                  notifications.show({
                    title: "Success",
                    message: "Markdown Copied!",
                  });
                }}
                icon={<IconCopy size={14} />}
              >
                Copy Markdown
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Container mx={0}>
            <Title pt="xl" size="h2">
              {bookTitle}
            </Title>
            {book.authors && (
              <Text pb="sm">
                {convertCapitalToCamelCase(formatNames(book.authors))}
              </Text>
            )}
          </Container>
        </Container>
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
            {recommendation?.books.map((book, index) => {
              if (convertCapitalToCamelCase(book.title) === bookTitle) {
                return null;
              }
              return (
                <Container
                  key={index}
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
                  {book.authors.length > 0 && (
                    <Text size="sm">
                      {convertCapitalToCamelCase(formatNames(book.authors))}
                    </Text>
                  )}
                </Container>
              );
            })}
          </Container>
        </Container>
      </Container>
    );
  }

  return null;
};

export default Recommendation;
