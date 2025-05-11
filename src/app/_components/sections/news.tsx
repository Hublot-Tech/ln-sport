import { formatDate } from "@ln-foot/utils";
import React from "react";
import { SectionTitle } from "../common/section-title";
import Link from "next/link";
import { apiClient } from "@ln-foot/api/api-client";
import type { NewsArticle } from "@ln-foot/api/types";


export const News: React.FC<{ actuality: NewsArticle }> = ({ actuality }) => {
  return (
    <div className="xs:flex items-center justify-center">
      <div className="xs:max-w-md card transition-transform lg:card-side hover:scale-105 hover:shadow-xl">
        <figure className="w-full">
          <img
            className="min-h-full min-w-full"
            src={actuality?.imageUrl ?? "/ln-icon.svg"}
            alt="Football News"
          />
        </figure>
        <div className="slide-in card-body px-0 sm:px-4 h-14">
          <p className="">{formatDate(actuality.publishedAt ?? new Date())}</p>
          <h2 className="link-hover link card-title">
            <Link href={`/news/${actuality.id}`}>{actuality.title}</Link>
          </h2>
          <p>{actuality.summary?.substring(0, 20)}...</p>
        </div>
      </div>
    </div>
  );
};

export default async function NewsList() {
  const [latestNews, ...news] = await apiClient.newsArticles.findAll();

  return (
    <section className="section bg-[#F1F0F0] p-6">
      <SectionTitle title="Actualites sportives" pageRef="/news" />
      <div className="grid cursor-pointer gap-10 md:grid-cols-2">
        <div className="items-center justify-center">
          <div className="card">
            <figure className="fade-in w-full">
              <img
                className="min-h-full min-w-full"
                src={latestNews?.imageUrl ?? "/ln-icon.svg"}
                alt="Football News"
              />
            </figure>
            <div className="slide-in card-body px-0 sm:px-4">
              <p>
                {latestNews && formatDate(latestNews.publishedAt ?? new Date())}
              </p>
              <h2 className="link-hover link card-title">
                {latestNews?.title}
              </h2>
              <p>{latestNews?.summary}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-10">
          {news.map((actuality, i) => (
            <News key={i} actuality={actuality} />
          ))}
        </div>
      </div>
    </section>
  );
}
