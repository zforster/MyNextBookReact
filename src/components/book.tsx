import { Book as BookType } from "../datatypes/recommendation";
import { Center, Container, Image, Space, Text } from "@mantine/core";
import { Rating, Badge } from "@mantine/core";

const Book = ({ recommendation }: { recommendation: BookType }) => {
  const formatNames = (names: string[]) => {
    switch (names.length) {
      case 1:
        return names[0];
      case 2:
        return names.join(" & ");
      default:
        return "";
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        paddingBottom: "60px",
      }}
    >
      <Center sx={{ flexDirection: "column", display: "flex" }}>
        <Text
          size={"md"}
          align="center"
          sx={{ maxWidth: "500px", color: "white" }}
        >
          {recommendation.title}
          {recommendation.subtitle && `: ${recommendation.subtitle}`}
        </Text>

        <Space h="md" />

        <a
          href={recommendation.amazonSearchUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            radius={"sm"}
            src={recommendation.thumbnailUrl}
            width={120}
            height={192}
          />
        </a>

        <Space h="md" />

        {recommendation.authors && (
          <Text size="sm" align="center">
            By {formatNames(recommendation.authors)}
          </Text>
        )}

        <Space h="md" />

        <Container
          sx={{
            padding: 0,
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Rating
            readOnly
            fractions={2}
            value={
              recommendation.averageRating ? recommendation.averageRating : 0
            }
          />
          <Space w="xs" />
          <Text size={"xs"} style={{ paddingTop: "3px" }}>
            {recommendation.totalRatings
              ? `${
                  recommendation.averageRating
                    ? recommendation.averageRating
                    : 0
                } Ratings`
              : "0 Ratings"}
          </Text>
        </Container>

        <Space h="md" />

        {recommendation.categories.map((category) => (
          <Badge>{category}</Badge>
        ))}

        <Space h="md" />

        <Text size={"sm"} lineClamp={3}>
          {recommendation.description}
        </Text>
      </Center>
    </Container>
  );
};

export default Book;
