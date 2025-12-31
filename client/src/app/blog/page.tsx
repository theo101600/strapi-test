import { getPageBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";

import { ContentList } from "@/components/ContentList";

import { BlogCard } from "@/components/Blogcard";

async function loader(slug: string) {
  const { data } = await getPageBySlug(slug);
  // console.log(data);
  if (data.length === 0) notFound();
  return { blocks: data[0]?.attributes?.blocks };
}

interface PageProps {
  searchParams: Promise<{ page?: string; query?: string }>;
}

export default async function BlogRoute({ searchParams }: PageProps) {
  const { page, query } = await searchParams;
  const { blocks } = await loader("blog");

  return (
    <div className="blog-page">
      <BlockRenderer blocks={blocks} />
      <ContentList
        headline="Check out our latest articles"
        path="/api/articles"
        component={BlogCard}
        query={query}
        page={page}
        showSearch
        showPagination
      />
    </div>
  );
}
