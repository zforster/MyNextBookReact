import { Header, Container, Text } from "@mantine/core";
import { IconBook } from "@tabler/icons";
import Search from "./search";
import { useGetRecommendationsFromTextMutation } from "../apis/recommendation";

export const HeaderBanner = () => {
  const [getRecommendations, { isLoading, isError }] =
    useGetRecommendationsFromTextMutation();

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
        <a
          href={"/"}
          style={{
            textDecoration: "none",
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
        </a>

        <Search
          isLoading={isLoading}
          isError={isError}
          getRecommendations={getRecommendations}
        />
      </Container>
    </Header>
  );
};
