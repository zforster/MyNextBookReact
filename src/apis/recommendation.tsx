import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Recommendation } from "../datatypes/recommendation";

const API_BASE = "https://ffvhcdhygf.execute-api.eu-west-1.amazonaws.com/Prod/";

export const recommendationAPI = createApi({
  reducerPath: "recommendation",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
  }),
  endpoints: (build) => ({
    getRecommendationsFromText: build.mutation<Recommendation[], string>({
      query(body) {
        return {
          url: "recommendations_from_text",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetRecommendationsFromTextMutation } = recommendationAPI;
