import React from "react";
import Header from "../header";

type HeroSectionProps = {
  title: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({ title }) => {
  return (
    <section
      id="hero-section"
      style={{
        backgroundImage: "url(/hero-image.png)",
      }}
      className="relative flex h-4/5 flex-col justify-center bg-contain bg-center text-center text-white"
    >
      <div className="animate-gradient bg-animate h-full gap-4 bg-gradient-to-r sm:from-blue-900/20 sm:to-blue-950/80 from-blue-900 to-blue-950/80 p-5">
        <Header />
        <div className="relative flex h-2/3 flex-col items-center justify-center gap-4">
          <h2 className="text-4xl font-bold uppercase">{title}</h2>
          <button className="rounded-lg btn bg-[#F3653D] hover:bg-[#F3653D]/95 text-white">
            En savoir plus
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
