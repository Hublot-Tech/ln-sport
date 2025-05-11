import React from "react";
import Header from "../header";

type HeroSectionProps = {
  title: string;
  imageUrl: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({ title, imageUrl }) => {
  return (
    <section
      id="hero-section"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
      className="relative flex h-4/5 flex-col justify-center bg-contain bg-center text-center text-white"
    >
      <div className="animate-gradient bg-animate h-full gap-4 bg-gradient-to-r from-blue-900 to-blue-950/80 p-5 sm:from-blue-900/20 sm:to-blue-950/80">
        <Header />
        <div className="relative flex h-2/3 flex-col items-center justify-center gap-4">
          <h2 className="text-4xl font-bold uppercase">{title}</h2>
          <button className="btn rounded-lg bg-[#F3653D] text-white hover:bg-[#F3653D]/95">
            En savoir plus
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
