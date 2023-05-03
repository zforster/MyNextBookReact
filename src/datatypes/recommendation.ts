export interface Book {
  title: string;
  subtitle?: string;
  authors: string[];
  publisher?: string;
  publishDate?: string;
  description?: string;
  pages?: number;
  categories: string[];
  averageRating?: number;
  totalRatings?: number;
  thumbnailUrl: string;
  amazonSearchUrl: string;
}

export interface RecommendationResponse {
  recommendationId: string;
  userInput: string;
  timestamp: string;
  books: Book[];
}

export interface ExclusiveStartKey {
  recommendationType: string;
  timestamp: string;
}

export interface ExclusiveStartKeyInput {
  timestamp: string | null;
  recommendationType: string;
}

export interface FetchBookRecommendationsResponse {
  recommendations: RecommendationResponse[];
  exclusiveStartKey: ExclusiveStartKey | null;
}