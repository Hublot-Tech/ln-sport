import { getBaseUrl } from "@ln-foot/utils";
import type {
  ApiResponse,
  EcommerceArticle,
  Highlight,
  League,
  Match,
  NewsArticle,
  Advertisement,
} from "./types";

const baseUrl = getBaseUrl();

export const apiClient = {
  newsArticles: {
    async findAll() {
      const {
        result: {
          data: { json },
        },
      } = await fetch(`${baseUrl}/api/trpc/newsArticles.latest`, {
        method: "GET",
      }).then((data) => data.json() as Promise<ApiResponse<NewsArticle[]>>);
      console.log(json);
      return json;
    },

    async findOne(id: string) {
      const newsArticles = await this.findAll();

      return newsArticles.find((newsArticle) => newsArticle.id === id);
    },
  },

  matchs: {
    async findAll(competion?: string) {
      const {
        result: {
          data: { json },
        },
      } = await fetch(
        `${baseUrl}/api/trpc/matchs.latest?competion=${competion}`,
        {
          method: "GET",
        },
      ).then((data) => data.json() as Promise<ApiResponse<Match[]>>);

      return json;
    },

    async findOne(id: string) {
      const matchs = await this.findAll();

      return matchs.find((match) => match.id === id);
    },
  },

  ecommerceArticles: {
    async findAll() {
      const {
        result: {
          data: { json },
        },
      } = await fetch(`${baseUrl}/api/trpc/ecommerceArticles.latest`, {
        method: "GET",
      }).then(
        (data) => data.json() as Promise<ApiResponse<EcommerceArticle[]>>,
      );

      return json;
    },

    async findOne(id: string) {
      const ecommerceArticles = await this.findAll();

      return ecommerceArticles.find(
        (ecommerceArticle) => ecommerceArticle.id === id,
      );
    },
  },

  highlights: {
    async findAll() {
      const {
        result: {
          data: { json },
        },
      } = await fetch(`${baseUrl}/api/trpc/highlights.latest`, {
        method: "GET",
      }).then((data) => data.json() as Promise<ApiResponse<Highlight[]>>);

      return json;
    },

    async findOne(id: string) {
      const highlights = await this.findAll();

      return highlights.find((highlight) => highlight.id === id);
    },
  },

  advertisements: {
    async findAll() {
      const {
        result: {
          data: { json },
        },
      } = await fetch(`${baseUrl}/api/trpc/advertisements.latest`, {
        method: "GET",
      }).then((data) => data.json() as Promise<ApiResponse<Advertisement[]>>);

      return json;
    },

    async findOne(id: string) {
      const advertisements = await this.findAll();

      return advertisements.find((advertisement) => advertisement.id === id);
    },
  },

  leagues: {
    async findAll() {
      const {
        result: {
          data: { json },
        },
      } = await fetch(`${baseUrl}/api/trpc/leagues.latest`, {
        method: "GET",
      }).then((data) => data.json() as Promise<ApiResponse<League[]>>);

      return json;
    },

    async findOne(id: string) {
      const leagues = await this.findAll();

      return leagues.find((league) => league.id === id);
    },
  },
};
