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
  const [latestNews] = await apiClient.newsArticles.findAll();
  const leagues = await apiClient.leagues.findAll();
  const league = leagues.find((l) =>
    l.country.toLowerCase().includes("cameroon"),
  );

  return (
    <>
      <HeroSection latestNews={latestNews} />
      <ScrollAnimation>
        <LiveScores
          leagueName={league?.leagueName ?? "All"}
          leagueId={league?.id}
        />
        <Highlights />
        <NewsList />
        <Articles />
        <Advertisements />
      </ScrollAnimation>
    </>
  );
}
