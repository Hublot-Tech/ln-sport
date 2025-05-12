import { apiClient } from "@ln-foot/api/api-client";
import { getYouTubeEmbedUrl, isYouTubeUrl } from "@ln-foot/utils";
import { formatDate } from "@ln-foot/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: Promise<{ id: string }>;
}

export default async function HighlightPage({ params }: UserPageProps) {
  const highlight = await apiClient.highlights.findOne((await params).id);

  if (!highlight) {
    notFound();
  }

  return (
    <section className="flex items-center justify-center">
      <div className="p-6 lg:w-2/3">
        <div>
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
          {highlight.videoUrl ? (
            isYouTubeUrl(highlight.videoUrl) ? (
              <iframe
                className="aspect-video w-full"
                src={getYouTubeEmbedUrl(highlight.videoUrl)}
                title={`YouTube video: ${highlight.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video id="video1" controls className="w-full">
                <source src={highlight.videoUrl} />
                Your browser does not support HTML video.
              </video>
            )
          ) : (
            <div className="text-gray-500">No video available.</div>
          )}

          <div className="p-4">
            <p>{formatDate(highlight.publishedAt ?? new Date())}</p>
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
  );
}
