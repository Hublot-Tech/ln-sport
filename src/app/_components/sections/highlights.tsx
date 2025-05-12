import { apiClient } from "@ln-foot/api/api-client";
import { SectionTitle } from "../common/section-title";
import { HighlightItem } from "./highlight-item";

export default async function Highlights() {
  const highlights = await apiClient.highlights.findAll();
  console.log(highlights)

  return (
    <section className="section mx-4 my-8 p-4">
      <SectionTitle title="Points Forts" pageRef="/highlights" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((highlight, index) => (
          <HighlightItem key={`highlight-${index}`} highlight={highlight} />
        ))}
      </div>
    </section>
  );
}
