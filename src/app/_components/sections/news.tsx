import { formatDate } from "@ln-foot/utils";
import React from "react";
import { SectionTitle } from "../common/section-title";
import Link from "next/link";
import { apiClient } from "@ln-foot/api/api-client";
import type { NewsArticle } from "@ln-foot/api/types";

const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-lg">
      <figure className="aspect-video w-full overflow-hidden">
        <img
          src={article?.imageUrl ?? "/ln-icon.svg"}
          alt="Football News"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </figure>
      <div className="flex flex-col gap-2 p-4">
        <p className="text-sm text-gray-500">
          {formatDate(article.publishedAt ?? new Date())}
        </p>
        <Link
          href={`/news/${article.id}`}
          className="line-clamp-2 text-lg font-semibold text-gray-800 transition-colors hover:text-primary"
        >
          {article.title}
        </Link>
        <p className="line-clamp-2 text-sm text-gray-600">
          {article.summary ?? ""}
        </p>
      </div>
    </div>
  );
};

export default async function NewsList() {
  const [latestNews, ...news] = await apiClient.newsArticles.findAll();

  return (
    <section className="section bg-[#F1F0F0] px-4 py-10 sm:px-6 lg:px-12">
      <SectionTitle title="Actualités sportives" pageRef="/news" />
      <div className="grid gap-10 md:grid-cols-2">
        {/* Main article */}
        {latestNews && (
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
            <figure className="aspect-video">
              <img
                src={latestNews?.imageUrl ?? "/ln-icon.svg"}
                alt="Football News"
                className="h-full w-full object-cover"
              />
            </figure>
            <div className="flex flex-col gap-3 p-6">
              <p className="text-sm text-gray-500">
                {formatDate(latestNews.publishedAt ?? new Date())}
              </p>
              <h2 className="text-2xl font-bold text-gray-800">
                {latestNews.title}
              </h2>
              <p className="text-gray-700">{latestNews.summary}</p>
              <Link
                href={`/news/${latestNews.id}`}
                className="mt-2 text-sm text-primary hover:underline"
              >
                Lire l’article complet →
              </Link>
            </div>
          </div>
        )}

        {/* Other articles */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {news.map((article, i) => (
            <NewsCard key={i} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
