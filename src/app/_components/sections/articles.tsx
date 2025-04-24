import { apiClient } from "@ln-foot/api/api-client";
import { SectionTitle } from "../common/section-title";
import type { EcommerceArticle } from "@ln-foot/api/types";

export const Article: React.FC<{ article: EcommerceArticle }> = ({
  article,
}) => {
  return (
    <div className="card max-w-md cursor-pointer">
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

export default async function Articles() {
  const articles = await apiClient.ecommerceArticles.findAll();
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
}
