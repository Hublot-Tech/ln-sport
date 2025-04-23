import { formatDate } from "@ln-foot/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBaseUrl } from "@ln-foot/utils";
import { type ArticleNews } from "@components/sections/news";

async function fetchNews() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/trpc/news.latest`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.error('Failed to fetch news:', res.status, res.statusText);
    return [];
  }

  const data = await res.json() as  ArticleNews[];
  return data ?? [];
}

export default async function NewsPage() {
  const newsData = await fetchNews();

  if (!newsData.length) {
    return notFound();
  }

  const [latestNews, ...news] = newsData;

  return (
      <section className="lg:flex items-center justify-center">
        <div className="p-6 lg:w-1/2">
          <div className="">
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>News</li>
              </ul>
            </div>
            <h2 className="header-2">{latestNews?.title}</h2>
          </div>
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
                <p>{latestNews && formatDate(latestNews.publishedAt ?? new Date())}</p>
                <p>{latestNews!.summary}</p>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="grid gap-10 md:grid-cols-3">
            {news.map((actuality, i) => (
              <div key={i} className="flex items-center justify-center">
                <div className="card max-w-sm">
                  <figure className="w-full">
                    <img
                      className="min-h-full min-w-full"
                      src={actuality?.imageUrl ?? "/ln-icon.svg"}
                      alt="Football News"
                    />
                  </figure>
                  <div className="card-body px-0 py-4">
                    <p>{formatDate(actuality.publishedAt ?? new Date())}</p>
                    <h2 className="link-hover link card-title">
                      <Link href={`/news/${actuality.id}`}>
                        {actuality.title}
                      </Link>
                    </h2>
                    <p>{actuality.summary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
