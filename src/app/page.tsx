import ScrollAnimation from "@components/common/scoll-annimation";
import Footer from "@components/footer";
import Articles from "@components/sections/articles";
import HeroSection from "@components/sections/hero-section";
import Highlights from "@components/sections/highlights";
import LiveScores from "@components/sections/live-scores";
import NewsList from "@components/sections/news";
import { api, HydrateClient } from "@ln-foot/trpc/server";
import Publicites from "@components/sections/Publicites";

export default async function Home() {
  const [news, scores, articles, highlights, publicities] = await Promise.all([
    api.news.latest(),
    api.matches.latest(),
    api.articles.latest(),
    api.highlights.latest(),
    api.publicities.latest(),
  ]);

  return (
    <HydrateClient>
      <HeroSection title={"L'actualite du football en continu"} />
      <ScrollAnimation>
        <LiveScores competition="All" scores={scores} />
        <Highlights highlights={highlights} />
        <NewsList actualities={news} />
        <Articles articles={articles} />
        <Publicites publicities={publicities} />
      </ScrollAnimation>
      <Footer />
    </HydrateClient>
  );
}
