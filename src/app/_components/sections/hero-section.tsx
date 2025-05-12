import React from "react";
import Header from "../header";
import type { NewsArticle } from "@ln-foot/api/types";

type HeroSectionProps = {
  latestNews?: NewsArticle;
};

const HeroSection: React.FC<HeroSectionProps> = ({ latestNews }) => {
  return (
    <section
      id="hero-section"
      style={{
        backgroundImage: `url('${latestNews?.imageUrl ?? "/hero-image.png"}')`,
      }}
      className="relative flex h-4/5 flex-col justify-center bg-contain bg-center text-center text-white"
    >
      <div className="animate-gradient bg-animate h-full gap-4 bg-gradient-to-r from-blue-900 to-blue-950/80 p-5 sm:from-blue-900/20 sm:to-blue-950/80">
        <Header />
        <div className="relative flex h-2/3 flex-col items-center justify-center gap-4">
          <h2 className="text-4xl font-bold uppercase w-4/5 lg:w-3/5">{latestNews?.title}</h2>
          <a
            href={`/news/${latestNews?.apiArticleId}`}
            className="btn rounded-lg bg-[#F3653D] text-white hover:bg-[#F3653D]/95"
          >
            En savoir plus
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
