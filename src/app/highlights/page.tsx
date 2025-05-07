export const dynamic = "force-dynamic";

import { apiClient } from "@ln-foot/api/api-client";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  HighlightItem
} from "../_components/sections/highlights";

export default async function HighlightsPage() {
  const highlightsData = await apiClient.highlights.findAll();

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
