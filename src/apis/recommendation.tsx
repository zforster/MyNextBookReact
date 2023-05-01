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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: recommendation } = await queryFulfilled;
          dispatch(
            recommendationAPI.util.updateQueryData(
              "fetchRecommendations",
              // @ts-ignore
              "fetchRecommendations",
              (draft) => {
                const updatedRecommendations = [
                  recommendation,
                  ...draft.recommendations,
                ];
                Object.assign(draft.recommendations, updatedRecommendations);
              }
            )
          );
          dispatch(
            recommendationAPI.util.updateQueryData(
              "fetchRecommendationById",
              // @ts-ignore
              "fetchRecommendationById",
              (draft) => {
                const updatedRecommendations = [recommendation, ...draft];
                Object.assign(draft, updatedRecommendations);
              }
            )
          );
        } catch {}
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
    fetchRecommendationById: build.query<RecommendationResponse[], string>({
      query: (recommendationId) => recommendationId,
      serializeQueryArgs: () => {
        return "fetchRecommendationById";
      },
      transformResponse: (response: RecommendationResponse) => {
        return [response];
      },
    }),
  }),
});

export const {
  useGetRecommendationsFromTextMutation,
  useLazyFetchRecommendationsQuery,
  useLazyFetchRecommendationByIdQuery,
  endpoints,
} = recommendationAPI;
