"use client";

import { useState } from "react";
import { formatDate } from "@ln-foot/utils";
import DOMPurify from "isomorphic-dompurify";
import { NewsCard } from "../_components/sections/news";
import Link from "next/link";
import type { NewsArticle } from "@ln-foot/api/types";

export default function SearchableNews({
  newsData,
}: {
  newsData: NewsArticle[];
}) {
  const [query, setQuery] = useState("");

  const filteredNews = newsData.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ??
      item.summary?.toLowerCase().includes(query.toLowerCase()) ??
      item.content?.toLowerCase().includes(query.toLowerCase()),
  );

  const [latestNews, ...news] = filteredNews;

  return (
    <section className="items-center justify-center lg:flex">
      <div className="p-6 lg:w-1/2">
        <div className="mb-4">
          <div className="breadcrumbs mb-2 text-sm">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>News</li>
            </ul>
          </div>
          <input
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {latestNews && (
          <>
            <h2 className="header-2">{latestNews.title}</h2>

            <div className="grid gap-10">
              <div className="bg-base-100">
                <figure>
                  <img
                    style={{ width: "100%" }}
                    src={latestNews?.imageUrl ?? "/ln-icon.svg"}
                    alt="Football News"
                  />
                </figure>
                <div className="card-body px-0">
                  <p>{formatDate(latestNews.publishedAt ?? new Date())}</p>
                  <p>{latestNews.summary}</p>
                  <div className="divider"></div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(latestNews.content ?? ""),
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <div className="divider"></div>

        <div className="grid gap-10 md:grid-cols-3">
          {news.map((newsItem, i) => (
            <NewsCard key={i} news={newsItem} />
          ))}
        </div>
      </div>
    </section>
  );
}
