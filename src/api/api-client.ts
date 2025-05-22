import { getBaseUrl } from "@ln-foot/utils";
import type {
  ApiResponse,
  EcommerceArticle,
  Highlight,
  League,
  Fixtures,
  NewsArticle,
  Advertisement,
} from "./types";

const baseUrl = getBaseUrl();

async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`[safeFetch] Failed with status ${res.status} for ${url}`);
      return null;
    }

    const json = (await res.json()) as ApiResponse<T>;
    console.log(
      `[safeFetch] Fetched ${url} with status ${res.status} and data:`,
      json,
    );

    return json.result?.data.json ?? (json as T) ?? null;
  } catch (err) {
    console.error(`[safeFetch] Error fetching ${url}:`, err);
    return null;
  }
}

export const apiClient = {
  newsArticles: {
    async findAll() {
      return (
        (await safeFetch<NewsArticle[]>(
          `${baseUrl}/api/trpc/newsArticles.latest`,
        )) ?? []
      );
    },

    async findOne(id: string) {
      const all = await this.findAll();
      return all.find((el) => el.id === id);
    },
  },

  fixtures: {
    async findAll(competion?: string) {
      return (
        (await safeFetch<Fixtures[]>(
          `${baseUrl}/api/trpc/fixtures.latest?competion=${competion ?? ""}`,
        )) ?? []
      );
    },

    async findOne(id: string) {
      const all = await this.findAll();
      return all.find((el) => el.id === id);
    },
  },

  ecommerceArticles: {
    async findAll() {
      return (
        (await safeFetch<EcommerceArticle[]>(
          `https://lnfoot-api.hublots.co/api/products`,
        )) ?? []
      );
    },

    async findOne(id: string) {
      const all = await this.findAll();
      return all.find((el) => el.id === id);
    },
  },

  highlights: {
    async findAll() {
      return (
        (await safeFetch<Highlight[]>(
          `${baseUrl}/api/trpc/highlights.latest`,
        )) ?? []
      );
    },

    async findOne(id: string) {
      const all = await this.findAll();
      return all.find((el) => el.id === id);
    },
  },

  advertisements: {
    async findAll() {
      return (
        (await safeFetch<Advertisement[]>(
          `${baseUrl}/api/trpc/advertisements.latest`,
        )) ?? []
      );
    },

    async findOne(id: string) {
      const all = await this.findAll();
      return all.find((el) => el.id === id);
    },
  },

  leagues: {
    async findAll() {
      return (
        (await safeFetch<League[]>(`${baseUrl}/api/trpc/leagues.list`)) ?? []
      );
    },

    async findOne(id: string) {
      const all = await this.findAll();
      return all.find((el) => el.id === id);
    },
  },
};
