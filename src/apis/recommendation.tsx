import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RecommendationResponse } from "../datatypes/recommendation";

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
          url: "recommendations",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetRecommendationsFromTextMutation, endpoints } =
  recommendationAPI;
