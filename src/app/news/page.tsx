export const dynamic = "force-dynamic";

import { apiClient } from "@ln-foot/api/api-client";
import { notFound } from "next/navigation";
import SearchableNews from "./searchable-news";

export default async function NewsPage() {
  const newsData = await apiClient.newsArticles.findAll();

  if (!newsData.length) {
    return notFound();
  }

  return <SearchableNews newsData={newsData} />;
}
