import type { CardProps } from "@/components/Card";
import { getContent } from "@/data/loaders";
import { PaginationComponent } from "./PaginationComponent";
import { Search } from "@/components/Search";
import type { ArticleProps } from "@/types";

interface ContentListProps {
  headline: string;
  query?: string;
  path: string;
  featured?: boolean;

  // ✅ Component receives FLATTENED article props + basePath
  component: React.ComponentType<CardProps & { basePath: string }>;

  headlineAlignment?: "center" | "right" | "left";
  showSearch?: boolean;
  page?: string;
  showPagination?: boolean;
}

async function loader(
  path: string,
  featured?: boolean,
  query?: string,
  page?: string
) {
  const { data, meta } = await getContent(path, featured, query, page);

  return {
    articles: data ?? [],
    pageCount: meta?.pagination?.pageCount,
  };
}

export async function ContentList({
  headline,
  path,
  featured,
  component,
  headlineAlignment,
  showSearch,
  query,
  page,
  showPagination,
}: Readonly<ContentListProps>) {
  const { articles, pageCount } = await loader(path, featured, query, page);
  const Component = component;

  return (
    <section className="content-items container">
      <h3 className={`content-items__headline ${headlineAlignment ?? ""}`}>
        {headline}
      </h3>

      {showSearch && <Search />}

      <div className="content-items__container--card">
        {articles.map((article: ArticleProps) => (
          <Component
            key={article.id}
            {...article.attributes} // ✅ flattened props
            basePath={path}
          />
        ))}
      </div>

      {showPagination && <PaginationComponent pageCount={pageCount} />}
    </section>
  );
}
