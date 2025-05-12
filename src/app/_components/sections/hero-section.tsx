import React from "react";
import Header from "../header";
import type { NewsArticle } from "@ln-foot/api/types";

type HeroSectionProps = {
  latestNews?: NewsArticle;
};

const HeroSection: React.FC<HeroSectionProps> = ({ latestNews }) => {
  const backgroundImage = latestNews?.imageUrl ?? "/hero-image.png";

  return (
    <section
      id="hero-section"
      className="relative h-screen w-full bg-cover bg-center text-white"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-950/80 to-blue-900/90 backdrop-blur-sm" />

      <div className="relative z-10 flex h-full w-full flex-col justify-between px-6 py-8 sm:px-12 md:px-20 lg:px-32">
        <Header />

        <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
          <h2 className="text-3xl font-bold uppercase leading-tight sm:text-4xl md:text-5xl w-full max-w-3xl">
            {latestNews?.title ?? "Dernières actualités sportives"}
          </h2>

          {latestNews && (
            <a
              href={`/news/${latestNews.id}`}
              className="mt-4 inline-block rounded-lg bg-[#F3653D] px-6 py-3 text-base font-semibold transition hover:bg-[#F3653D]/90"
            >
              En savoir plus
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
