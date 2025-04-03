import { api, HydrateClient } from "@ln-foot/trpc/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "../_components/Footer";
import { HighlightItem } from "../_components/landingSections/Highlights";

export default async function HighlightsPage() {
  const {
    highlights: [latestHighlight, ...highlights],
  } = await api.highlight.latest();

  if (!latestHighlight) {
    return notFound();
  }

  return (
    <HydrateClient>
      <section className="items-center justify-center lg:flex">
        <div className="p-6 lg:w-2/3">
          <div className="">
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>News</li>
              </ul>
            </div>
            <h2 className="header-2">{latestHighlight.title}</h2>
          </div>
          <div className="grid gap-10">
            <div className="card gap-2">
              <video className="rounded-xl" id="video1" controls>
                <source className="size-auto" src={latestHighlight.videoRef} />
                Your browser does not support HTML video.
              </video>
            </div>
          </div>
          <div className="divider"></div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[latestHighlight, ...highlights].map(
              (highlight, index) => (
                <HighlightItem
                  key={`highlight-${index}`}
                  highlight={highlight}
                />
              ),
            )}
          </div>
        </div>
      </section>
      <Footer />
    </HydrateClient>
  );
}
