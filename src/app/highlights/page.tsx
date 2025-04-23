import { notFound } from "next/navigation";
import Link from "next/link";
import {
  type Highlight,
  HighlightItem,
} from "../_components/sections/highlights";
import { getBaseUrl } from "@ln-foot/utils";

async function fetchHighlights() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/trpc/highlights.latest`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("Failed to fetch highlights:", res.status, res.statusText);
    return [];
  }

  const data = (await res.json()) as Array<Highlight>;
  // Assuming your tRPC returns data in a format like { result: {  [...] } }
  return data ?? [];
}

export default async function HighlightsPage() {
  const highlightsData = await fetchHighlights();

  if (!highlightsData.length) {
    return notFound();
  }

  const [latestHighlight, ...highlights] = highlightsData;

  return (
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
          <h2 className="header-2">{latestHighlight!.title}</h2>
        </div>
        <div className="grid gap-10">
          <div className="card gap-2">
            <video className="rounded-xl" id="video1" controls>
              <source
                className="size-auto"
                src={latestHighlight!.videoUrl ?? ""}
              />
              Your browser does not support HTML video.
            </video>
          </div>
        </div>
        <div className="divider"></div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[latestHighlight!, ...highlights].map((highlight, index) => (
            <HighlightItem key={`highlight-${index}`} highlight={highlight} />
          ))}
        </div>
      </div>
    </section>
  );
}
