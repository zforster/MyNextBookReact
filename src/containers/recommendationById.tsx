import { Center, Loader } from "@mantine/core";
import { useLazyFetchRecommendationByIdQuery } from "../apis/recommendation";
import BookContainer from "../components/recommendation/container";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import Welcome from "../components/welcome";

const RecommendationById = () => {
  const { id } = useParams();

  const [
    fetchRecommendationByIdQuery,
    { data: recommendations, isFetching, isUninitialized },
  ] = useLazyFetchRecommendationByIdQuery();

  useEffect(() => {
    if (isUninitialized && id !== undefined) {
      fetchRecommendationByIdQuery(id);
      ReactGA.event({
        category: "Book Reccomendation",
        action: "View Recommendation",
        label: id,
      });
    }
  }, [fetchRecommendationByIdQuery, isUninitialized, id]);

  return (
    <div>
      {!isFetching && (
        <Center pb="md">
          <Welcome />
        </Center>
      )}
      {recommendations?.map((recommendation, index) => (
        <Center key={`${recommendation.userInput}${index}`} pb="md">
          <BookContainer recommendationResponse={recommendation} />
        </Center>
      ))}
      {isFetching && (
        <Center>
          <Loader />
        </Center>
      )}
    </div>
  );
};

export default RecommendationById;
