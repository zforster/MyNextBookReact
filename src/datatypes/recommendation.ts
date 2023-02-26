export interface Recommendation {
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
