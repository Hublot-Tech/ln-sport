import { getBaseUrl } from "@ln-foot/utils";
import type {
    ApiResponse,
    EcommerceArticle,
    Highlight,
    Match,
    NewsArticle,
    Publicity,
} from "./types";

const baseUrl = getBaseUrl();

export const apiClient = {
  newsArticles: {
    async findAll() {
      const {
        result: {
          data: { json },
        },
      } = await fetch(`${baseUrl}/api/trpc/news.latest`, {
        method: "GET",
      }).then((data) => data.json() as Promise<ApiResponse<NewsArticle[]>>);

      return json;
    },

    async findOne(id: string) {
      const {
        result: {
          data: { json },
        },
      } = await fetch(`${baseUrl}/api/trpc/news.findOne`, {
        method: "GET",
      }).then(
        (data) => data.json() as Promise<ApiResponse<NewsArticle | undefined>>,
      );

      return json;
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
      const {
        result: {
          data: { json },
        },
      } = await fetch(`${baseUrl}/api/trpc/news.findOne`, {
        method: "GET",
      }).then((data) => data.json() as Promise<ApiResponse<Match | undefined>>);

      return json;
    },
  },

  ecommerceArticles: {
    async findAll() {
      const {
        result: {
          data: { json },
        },
      } = await fetch(`${baseUrl}/api/trpc/articles.latest`, {
        method: "GET",
      }).then(
        (data) => data.json() as Promise<ApiResponse<EcommerceArticle[]>>,
      );

      return json;
    },

    async findOne(id: string) {
      const {
        result: {
          data: { json },
        },
      } = await fetch(`${baseUrl}/api/trpc/articles.findOne`, {
        method: "GET",
      }).then(
        (data) =>
          data.json() as Promise<ApiResponse<EcommerceArticle | undefined>>,
      );

      return json;
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
      const {
        result: {
          data: { json },
        },
      } = await fetch(`${baseUrl}/api/trpc/highlights.findOne`, {
        method: "GET",
      }).then(
        (data) => data.json() as Promise<ApiResponse<Highlight | undefined>>,
      );

      return json;
    },
  },

  publicities: {
    async findAll() {
      const {
        result: {
          data: { json },
        },
      } = await fetch(`${baseUrl}/api/trpc/publicities.latest`, {
        method: "GET",
      }).then((data) => data.json() as Promise<ApiResponse<Publicity[]>>);

      return json;
    },

    async findOne(id: string) {
      const {
        result: {
          data: { json },
        },
      } = await fetch(`${baseUrl}/api/trpc/publicities.findOne`, {
        method: "GET",
      }).then(
        (data) => data.json() as Promise<ApiResponse<Publicity | undefined>>,
      );

      return json;
    },
  },
};
