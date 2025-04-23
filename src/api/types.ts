// trpc Routes ref:https://github.com/Hublot-Tech/admin-ln-foot.git 
export type ApiResponse<T> = {
  result: {
    data: { json: T };
  };
};

export type EcommerceArticle = {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  title: string;
  publishedAt: Date | null;
  content: string | null;
  summary: string | null;
  imageUrl: string | null;
  sourceUrl: string | null;
  price: string | null;
  ecommerceId: string | null;
};

export type Highlight = {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  apiSource: string | null;
  matchId: string | null;
  title: string | null;
  description: string | null;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  publishedAt: Date | null;
  apiHighlightId: string | null;
};

export type League = {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  sportId: string | null;
  leagueName: string;
  country: string;
  tier: number | null;
  apiSource: string | null;
  apiLeagueId: string | null;
  logoUrl: string | null;
  matches: Match[];
};

export type Match = {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  apiSource: string | null;
  leagueId: string;
  team1Id: string;
  team2Id: string;
  matchDatetime: Date;
  apiMatchId: string | null;
  status: string | null;
  score1: number;
  score2: number;
};

export type NewsArticle = {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  apiSource: string | null;
  title: string;
  publishedAt: Date | null;
  content: string | null;
  summary: string | null;
  imageUrl: string | null;
  sourceUrl: string | null;
  apiArticleId: string | null;
};

export type Publicity = {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  title: string;
  description: string | null;
  imageUrl: string | null;
  referenceUrl: string | null;
};
