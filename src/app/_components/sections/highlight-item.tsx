import type { Highlight } from "@ln-foot/api/types";
import { getYouTubeEmbedUrl, isYouTubeUrl } from "@ln-foot/utils";
import Link from "next/link";
import React from "react";

interface HighlightItemProps {
  highlight: Highlight;
}

export const HighlightItem: React.FC<HighlightItemProps> = ({ highlight }) => {
  return (
    <div
      className="card overflow-hidden rounded-lg bg-white shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-md"
      role="button"
      tabIndex={0}
      aria-label={`Watch video: ${highlight.title}`}
    >
      <div className="relative aspect-video bg-gray-100">
        {isYouTubeUrl(highlight.videoUrl) ? (
          <iframe
            className="h-full w-full"
            src={getYouTubeEmbedUrl(highlight.videoUrl ?? "")}
            title={`YouTube video: ${highlight.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            className="h-full w-full object-cover"
            controls
            preload="metadata"
            aria-label={`Video for ${highlight.title}`}
          >
            <source src={highlight.videoUrl ?? ""} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        )}
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-base font-semibold text-gray-800 hover:underline">
          <Link href={`/highlights/${highlight.id}`}>{highlight.title}</Link>
        </h3>
        {highlight.description && (
          <p className="text-sm text-gray-600">{highlight.description}</p>
        )}
      </div>
    </div>
  );
};
