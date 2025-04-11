import React from "react";
import Header from "../header";

type HeroSectionProps = {
  title: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({ title }) => {
  return (
    <section
      id="hero-section"
      className="relative flex h-3/5 flex-col justify-center gap-4 text-center text-white"
    >
      <Header />
      <div className="relative flex h-2/3 flex-col items-center justify-center">
        <h2 className="text-4xl font-bold uppercase">{title}</h2>
        <button className="mt-4 w-fit rounded-full bg-orange-500 px-6 py-2">
          En savoir plus
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
