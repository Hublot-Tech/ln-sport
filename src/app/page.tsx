import ScrollAnimation from "@components/common/scoll-annimation";
import Footer from "@components/footer";
import Articles from "@components/sections/articles";
import HeroSection from "@components/sections/hero-section";
import Highlights from "@components/sections/highlights";
import LiveScores from "@components/sections/live-scores";
import NewsList from "@components/sections/news";
import { api, HydrateClient } from "@ln-foot/trpc/server";

export default async function Home() {
  const news = await api.news.latest();
  const scores = await api.matches.latest();
  const articles = await api.articles.latest();
  const highlights = await api.highlights.latest();

  return (
    <HydrateClient>
      <HeroSection title={"L'actualite du football en continu"} />
      <ScrollAnimation>
        <LiveScores competition="All" scores={scores} />
        <Highlights highlights={highlights} />
        <NewsList actualities={news} />
        <Articles articles={articles} />
      </ScrollAnimation>
      <Footer />
    </HydrateClient>
  );
}
