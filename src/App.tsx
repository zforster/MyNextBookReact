import { AppShell, Center, Loader, MantineProvider } from "@mantine/core";

// apis
import {
  endpoints,
  useFetchRecommendationsMutation,
} from "./apis/recommendation";
import { HeaderBanner } from "./components/header";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { shouldRenderRecommendations } from "./utils/recommendationUtils";
import BookContainer from "./components/recommendation/container";

const App = () => {
  const [
    fetchRecommendations,
    { isUninitialized, isLoading, data: fetchRecommendationsResponse },
  ] = useFetchRecommendationsMutation({
    fixedCacheKey: "fetch-recommendations",
  });

  const { data: recommendationResponse } = useSelector(
    endpoints.getRecommendationsFromText.select("recommendation-search")
  );

  useEffect(() => {
    if (isUninitialized) {
      fetchRecommendations({ exclusiveStartKey: null });
    }
  }, [fetchRecommendations, isUninitialized]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >= document.body.scrollHeight &&
        fetchRecommendationsResponse?.exclusiveStartKey !== undefined &&
        fetchRecommendationsResponse?.exclusiveStartKey !== null // null when reached the end of the cycle
      ) {
        fetchRecommendations({
          exclusiveStartKey: fetchRecommendationsResponse?.exclusiveStartKey,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchRecommendations, fetchRecommendationsResponse?.exclusiveStartKey]);

  return (
    <MantineProvider
      theme={{
        primaryShade: 3,
        colorScheme: "dark",
        primaryColor: "teal",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <AppShell header={<HeaderBanner />}>
        {recommendationResponse !== undefined &&
          shouldRenderRecommendations(recommendationResponse) && (
            <BookContainer recommendationResponse={recommendationResponse} />
          )}
        {fetchRecommendationsResponse?.recommendations.map(
          (recommendation, index) => (
            <BookContainer
              key={`${recommendation.userInput}${index}`}
              recommendationResponse={recommendation}
            />
          )
        )}
        {isLoading && (
          <Center p="xl">
            <Loader />
          </Center>
        )}
      </AppShell>
    </MantineProvider>
  );
};

export default App;
