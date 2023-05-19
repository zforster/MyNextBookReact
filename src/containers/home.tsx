import { Center, Loader } from "@mantine/core";
import { useLazyFetchRecommendationsQuery } from "../apis/recommendation";
import { useCallback, useEffect, useRef } from "react";
import BookContainer from "../components/recommendation/container";
import Welcome from "../components/welcome";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <link rel="canonical" href={`${window.location}`} />
      </Helmet>
      {!isFetching && (
        <Center pb="md">
          <Welcome />
        </Center>
      )}
      {fetchExistingRecommendationsResponse?.recommendations.map(
        (recommendation, index) => (
          <Center key={`${recommendation.userInput}${index}`} pb="md">
            <BookContainer recommendationResponse={recommendation} />
          </Center>
        )
      )}
      {isFetching && (
        <Center>
          <Loader />
        </Center>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default Home;
