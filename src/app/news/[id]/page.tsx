import Footer from "../../_components/footer";
import { formatDate } from "@ln-foot/utils";
import { api, HydrateClient } from "@ln-foot/trpc/server";
import { notFound } from "next/navigation";
import Link from "next/link";

interface UserPageProps {
  params: Promise<{ id: string }>;
}
export default async function NewsPage({ params }: UserPageProps) {
  const latestNews = await api.news.findOne({
    id: (await params).id,
  });

  if (!latestNews) {
    notFound();
  }

  return (
    <HydrateClient>
      <section className="flex items-center justify-center">
        <div className="p-6 lg:w-1/2">
          <div className="">
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/news">News</Link>
                </li>
                <li>{latestNews.title.slice(0, 20)}...</li>
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
                <p>{latestNews.summary}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </HydrateClient>
  );
}
