import ScrollAnimation from "@components/common/scoll-annimation";
import Articles from "@components/sections/articles";
import HeroSection from "@components/sections/hero-section";
import Highlights from "@components/sections/highlights";
import LiveScores from "@components/sections/live-scores";
import NewsList from "@components/sections/news";
import Publicites from "@components/sections/Publicites";

export default async function Home() {
  return (
    <>
      <HeroSection title={"L'actualite du football en continu"} />
      <ScrollAnimation>
        <LiveScores competition="All" />
        <Highlights />
        <NewsList />
        <Articles />
        <Publicites />
      </ScrollAnimation>
    </>
  );
}
