import { auth } from "@ln-foot/server/auth";
import { api, HydrateClient } from "@ln-foot/trpc/server";
import Footer from "./_components/Footer";
import Articles from "./_components/landingSections/Articles";
import HeroSection from "./_components/landingSections/HeroSection";
import Highlights from "./_components/landingSections/Highlights";
import LiveScores from "./_components/landingSections/LiveScores";
import NewsList from "./_components/landingSections/News";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    void api.post.getLatest.prefetch();
  }
  
  const { news } = await api.news.latest();
  const { scores } = await api.score.latest();
  const { articles } = await api.article.latest();
  const { highlights } = await api.highlight.latest();

  return (
    <HydrateClient>
      <HeroSection title={"L'actualite du football en continu"} />
      <LiveScores competition="MTN Elite One" scores={scores} />
      <Highlights highlights={highlights} />
      <NewsList actualities={news} />
      <Articles articles={articles} />
      <Footer />
    </HydrateClient>
  );
}
