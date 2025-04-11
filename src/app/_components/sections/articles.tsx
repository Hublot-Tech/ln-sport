import { SectionTitle } from "../common/section-title";
import { type ecommerceArticles as EcommerceArticlesTable } from "@server/db/schema";

export type Article = typeof EcommerceArticlesTable.$inferSelect;

type ArticlesProps = {
  articles: Article[];
};

const Article: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="cursor-pointer card max-w-md">
      <figure>
        <img src={article.imageUrl ?? ""} alt="Article" />
      </figure>
      <div className="card-body px-0">
        <h2 className="card-title">{article.title}</h2>
        <p>{article.summary}</p>
        <div className="card-actions">
          <button className="btn btn-outline w-full bg-base-secondary text-white">
            Acheter
          </button>
        </div>
      </div>
    </div>
  );
};

const Articles: React.FC<ArticlesProps> = ({ articles }) => {
  return (
    <section className="section flex flex-col gap-4 p-4">
      <SectionTitle title="Nos meilleurs articles" />
      <div className="grid grid-flow-row justify-center gap-8 md:grid-flow-col">
        {articles.map((acticle, index) => (
          <Article key={index} article={acticle} />
        ))}
      </div>
    </section>
  );
};

export { Articles as default };
