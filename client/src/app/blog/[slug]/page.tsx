import type { ArticleProps } from "@/types";
import { notFound } from "next/navigation";
import { formatDate } from "@/utils/format-date";
import { getContentBySlug } from "@/data/loaders";

import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { HeroSection } from "@/components/blocks/HeroSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function loader(slug: string) {
  const { data } = await getContentBySlug(slug, "/api/articles");
  // console.log(data);
  const article = data[0];
  if (!article) throw notFound();
  return { article: article as ArticleProps, blocks: article?.blocks };
}

interface ArticleOverviewProps {
  headline: string;
  description: string;
}

function ArticleOverview({
  headline,
  description,
}: Readonly<ArticleOverviewProps>) {
  return (
    <div className="article-overview">
      <div className="article-overview__info">
        <h3 className="article-overview__headline">{headline}</h3>
        <p className="article-overview__description">{description}</p>
      </div>
    </div>
  );
}

export default async function SingleBlogRoute({ params }: PageProps) {
  const slug = (await params).slug;
  const { article } = await loader(slug);
  const blocks = article.attributes.blocks;
  const data = await loader(slug);
  console.log(data);
  const { title, author, publishedAt, description, image } = article.attributes;

  return (
    <div>
      <HeroSection
        id={article.id}
        heading={title}
        theme="orange"
        image={image}
        author={author}
        publishedAt={formatDate(publishedAt)}
        darken={true}
      />

      <div className="container">
        <ArticleOverview headline={title} description={description} />
        <BlockRenderer blocks={blocks} />
      </div>
    </div>
  );
}
