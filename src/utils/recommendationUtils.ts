import { RecommendationResponse } from "../datatypes/recommendation";

export const shouldRenderRecommendations = (
  recommendationResponse: RecommendationResponse
) => recommendationResponse.books?.length > 0;
