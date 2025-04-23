import Footer from "@components/footer";
import { formatDate } from "@ln-foot/utils";
import { api, HydrateClient } from "../../../../../admin-ln-foot/lib/trpc/server";
import { notFound } from "next/navigation";
import Link from "next/link";

interface UserPageProps {
  params: Promise<{ id: string }>;
}
export default async function HighlightPage({ params }: UserPageProps) {
  const highlight = await api.highlights.findOne({
    id: (await params).id,
  });

  if (!highlight) {
    notFound();
  }

  return (
    <HydrateClient>
      <section className="flex items-center justify-center">
        <div className="p-6 lg:w-2/3">
          <div className="">
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/highlights">Highlights</Link>
                </li>
                <li>{highlight.title?.slice(0, 20)}...</li>
              </ul>
            </div>
            <h2 className="header-2">{highlight?.title}</h2>
          </div>
          <div className="grid gap-10">
            <video id="video1" controls>
              <source src={highlight.videoUrl ?? ""} />
              Your browser does not support HTML video.
            </video>
            <div className="p-4">
              <p>{highlight && formatDate(highlight.publishedAt ?? new Date())}</p>
              <h3 className="card-title mb-2 text-lg font-semibold">
                <Link
                  className="hover:underline"
                  href={`/highlights/${highlight.id}`}
                >
                  {highlight.title}
                </Link>
              </h3>

              {highlight.description && (
                <p className="mb-3 text-sm text-gray-600">
                  {highlight.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </HydrateClient>
  );
}
