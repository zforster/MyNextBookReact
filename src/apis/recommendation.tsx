import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BookIdentifier,
  RecommendationResponse,
  StringResponse,
} from "../datatypes/recommendation";

const API_BASE =
  window.location.hostname === "localhost"
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL_PRD;

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
    getSummary: build.query<StringResponse, BookIdentifier>({
      query: (bookIdentifier) =>
        `summary/${bookIdentifier.recommendationId}/${bookIdentifier.index}`,
    }),
    getLatest: build.query<RecommendationResponse, null>({
      query: () => `latest`,
    }),
    getReason: build.query<StringResponse, BookIdentifier>({
      query: (bookIdentifier) =>
        `reason/${bookIdentifier.recommendationId}/${bookIdentifier.index}`,
    }),
    fetchRecommendationById: build.query<RecommendationResponse, string>({
      query: (recommendationId) => recommendationId,
    }),
  }),
});

export const {
  useGetRecommendationsFromTextMutation,
  useGetLatestQuery,
  useLazyGetSummaryQuery,
  useLazyGetReasonQuery,
  useLazyFetchRecommendationByIdQuery,
  endpoints,
} = recommendationAPI;
