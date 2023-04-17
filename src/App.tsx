import { AppShell, Center, Loader, MantineProvider } from "@mantine/core";
import {
  endpoints,
  useLazyFetchRecommendationsQuery,
} from "./apis/recommendation";
import { HeaderBanner } from "./components/header";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useRef } from "react";
import { shouldRenderRecommendations } from "./utils/recommendationUtils";
import BookContainer from "./components/recommendation/container";

const App = () => {
  const bottomRef = useRef(null);

  const [
    fetchRecommendationsQuery,
    { data: fetchRecommendationsResponse, isFetching, isUninitialized },
  ] = useLazyFetchRecommendationsQuery();

  const { data: recommendationResponse } = useSelector(
    endpoints.getRecommendationsFromText.select("recommendation-search")
  );

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (
        entries[0].isIntersecting &&
        fetchRecommendationsResponse?.exclusiveStartKey !== null &&
        fetchRecommendationsResponse?.exclusiveStartKey !== undefined
      ) {
        fetchRecommendationsQuery(
          fetchRecommendationsResponse?.exclusiveStartKey
        );
      }
    },
    [fetchRecommendationsQuery, fetchRecommendationsResponse?.exclusiveStartKey]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const currentref = bottomRef.current;

    const observer = new IntersectionObserver(handleIntersection, options);

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (currentref) {
        observer.unobserve(currentref);
      }
    };
  }, [handleIntersection]);

  useEffect(() => {
    if (isUninitialized) {
      fetchRecommendationsQuery({
        timestamp: null,
        recommendationType: "search",
      });
    }
  }, [fetchRecommendationsQuery, isUninitialized]);

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
        {isFetching && (
          <Center p="xl">
            <Loader />
          </Center>
        )}
        <div ref={bottomRef} />
      </AppShell>
    </MantineProvider>
  );
};

export default App;
