import { Recommendation } from "../datatypes/recommendation";
import { Text } from "@mantine/core";
import { Rating, Group, Badge } from "@mantine/core";

const Book = ({ recommendation }: { recommendation: Recommendation }) => {
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

  const TitleText = ({
    recommendation,
  }: {
    recommendation: Recommendation;
  }) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "15px 0 10px 0",
        }}
      >
        <Text size={"xl"}>{recommendation.title}</Text>
        <Text>{formatNames(recommendation.authors)}</Text>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: "30px",
        maxWidth: "400px",
        width: "400px",
      }}
    >
      <a href={recommendation.amazonSearchUrl} target="_blank" rel="noreferrer">
        <img
          style={{ borderRadius: 10, width: "128px", height: "192px" }}
          src={recommendation.thumbnailUrl}
          alt="book_image"
        />
      </a>
      <TitleText recommendation={recommendation} />
      {recommendation.categories.map((category) => (
        <Badge color="gray" variant="filled" style={{ margin: "0 0 10px 0" }}>
          {category}
        </Badge>
      ))}
      <Group position="center">
        <Rating
          readOnly
          fractions={2}
          value={
            recommendation.averageRating ? recommendation.averageRating : 0
          }
        />
      </Group>
      <Text size={"xs"} style={{ paddingTop: "5px" }}>
        {recommendation.totalRatings
          ? `${
              recommendation.averageRating ? recommendation.averageRating : 0
            } Ratings`
          : "0 Ratings"}
      </Text>
    </div>
  );
};

export default Book;
