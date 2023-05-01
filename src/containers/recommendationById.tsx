import { Center, Loader } from "@mantine/core";
import { useLazyFetchRecommendationByIdQuery } from "../apis/recommendation";
import BookContainer from "../components/recommendation/container";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const RecommendationById = () => {
  const { id } = useParams();

  const [
    fetchRecommendationByIdQuery,
    { data: recommendations, isFetching, isUninitialized },
  ] = useLazyFetchRecommendationByIdQuery();

  useEffect(() => {
    if (isUninitialized && id !== undefined) {
      fetchRecommendationByIdQuery(id);
    }
  }, [fetchRecommendationByIdQuery, isUninitialized, id]);

  return (
    <div>
      {isFetching && (
        <Center p="xl">
          <Loader />
        </Center>
      )}
      {recommendations?.map((recommendation, index) => (
        <BookContainer
          key={`${recommendation.userInput}${index}`}
          recommendationResponse={recommendation}
        />
      ))}
    </div>
  );
};

export default RecommendationById;