import { Header, Container, Group, Text } from "@mantine/core";
import { IconBook } from "@tabler/icons";
import Search from "./search";
import { useGetRecommendationsFromTextMutation } from "../apis/recommendation";

export const HeaderBanner = () => {
  const [getRecommendations, { isLoading, isError }] =
    useGetRecommendationsFromTextMutation({
      fixedCacheKey: "recommendation-search",
    });

  return (
    <Header height={65} mb={120}>
      <Container
        style={{
          display: "flex",
          height: "100%",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconBook style={{ color: "#43fab1" }} size={30} />
          <Text
            color={"white"}
            style={{ paddingLeft: "7px" }}
            weight={400}
            size={"xl"}
          >
            MyNextBook
          </Text>
        </div>

        <Search
          isLoading={isLoading}
          isError={isError}
          getRecommendations={getRecommendations}
        />
      </Container>
    </Header>
  );
};
