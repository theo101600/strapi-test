import type { CardProps } from "@/components/Card";
import { Card } from "@/components/Card";

export function BlogCard({
  basePath,
  ...props
}: CardProps & { basePath: string }) {
  return <Card {...props} basePath={basePath} />;
}
