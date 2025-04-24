import React from "react";
import { SectionTitle } from "../common/section-title";
import Link from "next/link";
import type { Highlight } from "@ln-foot/api/types";
import { apiClient } from "@ln-foot/api/api-client";

interface HighlightItemProps {
  highlight: Highlight;
}

export const HighlightItem: React.FC<HighlightItemProps> = ({ highlight }) => {
  "use client";

  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div
      className="card h-56 overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      onClick={handleVideoLoad}
      role="button"
      aria-label={`Watch video: ${highlight.title}`}
      tabIndex={0}
    >
      <div className="p-4">
        <h3 className="card-title mb-2 text-lg font-semibold">
          <Link
            className="hover:underline"
            href={`/highlights/${highlight.id}`}
          >
            {highlight.title}
          </Link>
        </h3>

        {highlight.description && (
          <p className="mb-3 text-sm text-gray-600">{highlight.description}</p>
        )}
      </div>

      <div className="relative aspect-video bg-gray-100">
        {isVideoLoaded ? (
          <video
            className="h-full w-full object-cover"
            controls
            preload="metadata"
            aria-label={`Video for ${highlight.title}`}
          >
            <source src={highlight.videoUrl ?? ""} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {highlight.thumbnailUrl ? (
              <img
                src={highlight.thumbnailUrl ?? ""}
                alt={`Thumbnail for ${highlight.title}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <svg
                  className="h-12 w-12 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 6.82v6.36a.75.75 0 0 0 1.15.63l5.25-3.18a.75.75 0 0 0 0-1.26L9.15 6.19A.75.75 0 0 0 8 6.82z" />
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM10 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-white bg-opacity-70 p-3">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default async function Highlights() {
  const highlights = await apiClient.highlights.findAll();
  return (
    <section className="section mx-4 my-8 p-4">
      <SectionTitle title="Points Forts" pageRef="/highlights" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((highlight, index) => (
          <HighlightItem key={`highlight-${index}`} highlight={highlight} />
        ))}
      </div>
    </section>
  );
}
