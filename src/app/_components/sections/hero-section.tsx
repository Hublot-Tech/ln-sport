"use client";
import { useEffect, useState } from "react";
import type { NewsArticle } from "@ln-foot/api/types";
import Header from "../header";

type HeroSectionProps = {
  latestNews: NewsArticle[];
};

const HeroSection: React.FC<HeroSectionProps> = ({ latestNews }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Autoplay every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % latestNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [latestNews.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden text-white">
      {/* ✅ Header fixed but pushed down */}
      <div className="absolute left-0 right-0 top-6 z-20">
        <Header />
      </div>

      {/* ✅ Carousel container */}
      <div className="carousel h-full w-full">
        {latestNews.map((item, index) => (
          <div
            key={index}
            className={`carousel-item absolute h-full w-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "z-10 opacity-100" : "z-0 opacity-0"
            } bg-cover bg-center`}
            style={{
              backgroundImage: `url('${item.imageUrl ?? "/hero-image.png"}')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
            <div className="relative z-20 flex h-full w-full flex-col items-start justify-center gap-6 px-6 py-8 sm:px-12 md:px-20 lg:px-32">
              <h2 className="max-w-2xl text-3xl font-bold uppercase leading-tight sm:text-4xl md:text-5xl">
                {item.title}
              </h2>
              <a
                href={`/news/${item.id}`}
                className="inline-block rounded-lg bg-[#F3653D] px-6 py-3 text-base font-semibold transition hover:bg-[#F3653D]/90"
              >
                En savoir plus
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Navigation Buttons */}
      <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {latestNews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-3 w-3 rounded-full ${
              i === currentSlide ? "bg-white" : "bg-white/40"
            } transition`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
