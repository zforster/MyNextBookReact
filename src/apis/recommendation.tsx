import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  RecommendationResponse,
  FetchBookRecommendationsResponse,
  ExclusiveStartKeyInput,
} from "../datatypes/recommendation";

const API_BASE = "https://ffvhcdhygf.execute-api.eu-west-1.amazonaws.com/Prod/";

export const recommendationAPI = createApi({
  reducerPath: "recommendation",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
  }),
  endpoints: (build) => ({
    getRecommendationsFromText: build.mutation<RecommendationResponse, string>({
      query(body) {
        return {
          url: "new",
          method: "POST",
          body,
        };
      },
    }),
    fetchRecommendations: build.query<
      FetchBookRecommendationsResponse,
      ExclusiveStartKeyInput
    >({
      query: (exclusiveStartKeyInput) =>
        `recommendations/${exclusiveStartKeyInput.recommendationType}/${exclusiveStartKeyInput.timestamp}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.recommendations.push(...newItems.recommendations);
        currentCache.exclusiveStartKey = newItems.exclusiveStartKey;
      },
    }),
  }),
});

export const {
  useGetRecommendationsFromTextMutation,
  useLazyFetchRecommendationsQuery,
  endpoints,
} = recommendationAPI;
