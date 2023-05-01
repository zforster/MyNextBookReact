import { Center, Loader } from "@mantine/core";
import { useLazyFetchRecommendationsQuery } from "../apis/recommendation";
import { useCallback, useEffect, useRef } from "react";
import BookContainer from "../components/recommendation/container";

const Home = () => {
  const bottomRef = useRef(null);

  const [
    fetchRecommendationsQuery,
    { data: fetchExistingRecommendationsResponse, isFetching, isUninitialized },
  ] = useLazyFetchRecommendationsQuery();

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (
        entries[0].isIntersecting &&
        fetchExistingRecommendationsResponse?.exclusiveStartKey !== null &&
        fetchExistingRecommendationsResponse?.exclusiveStartKey !== undefined
      ) {
        fetchRecommendationsQuery(
          fetchExistingRecommendationsResponse?.exclusiveStartKey
        );
      }
    },
    [
      fetchRecommendationsQuery,
      fetchExistingRecommendationsResponse?.exclusiveStartKey,
    ]
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
    <div>
      {fetchExistingRecommendationsResponse?.recommendations.map(
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
    </div>
  );
};

export default Home;