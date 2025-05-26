export const dynamic = "force-dynamic";

import ScrollAnimation from "@components/common/scoll-annimation";
import Articles from "@components/sections/articles";
import HeroSection from "@components/sections/hero-section";
import Highlights from "@components/sections/highlights";
import LiveScores from "@components/sections/live-scores";
import NewsList from "@components/sections/news";
import { apiClient } from "@ln-foot/api/api-client";
import Advertisements from "@ln-foot/app/_components/sections/advertisements";

export default async function Home() {
  const latestNews = await apiClient.newsArticles.findAll();
  const majorUpdates = latestNews.filter((l) => l.isMajorUpdate);

  return (
    <>
      <HeroSection
        latestNews={majorUpdates.length ? majorUpdates : latestNews}
      />
      <ScrollAnimation>
        <LiveScores />
        <Highlights />
        <NewsList />
        <Articles />
        <Advertisements />
      </ScrollAnimation>
    </>
  );
}
