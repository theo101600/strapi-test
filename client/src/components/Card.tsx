import Link from "next/link";
import { StrapiImage } from "@/components/StrapiImage";
import { formatDate } from "@/utils/format-date";

interface ImageAttributes {
  url: string | null;
  alternativeText: string | null;
}

interface ImageData {
  attributes: ImageAttributes;
}

interface ImageProps {
  data: ImageData | null;
}

export interface CardProps {
  title: string;
  description: string;
  slug: string;
  image: ImageProps | null;
  createdAt: string;
  basePath: string;
}

export function Card({
  title,
  description,
  slug,
  image,
  createdAt,
  basePath,
}: Readonly<CardProps>) {
  return (
    <Link href={`/${basePath}/${slug}`} className="content-items__card">
      <div className="content-items__card-img">
        <StrapiImage
          src={image?.data?.attributes?.url}
          alt={
            image?.data?.attributes?.alternativeText ??
            "No alternative text provided"
          }
          width={400}
          height={400}
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      <div className="content-items__card-text">
        <h5>{title}</h5>
        <p>{formatDate(createdAt)}</p>
        <p>
          {description.length > 144
            ? `${description.slice(0, 144)}...`
            : description}
        </p>
      </div>
    </Link>
  );
}
