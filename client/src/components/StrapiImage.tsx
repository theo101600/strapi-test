import Image from "next/image";
import { getStrapiMedia } from "@/utils/get-strapi-media";

interface StrapiImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  width: number;
  height: number;
  sizes?: string;
}

export function StrapiImage({
  src,
  alt,
  className,
  width,
  height,
  sizes,
}: Readonly<StrapiImageProps>) {
  const imageUrl = getStrapiMedia(src);

  if (!imageUrl) return null;

  return (
    <Image
      src={imageUrl}
      alt={alt}
      className={className}
      width={width}
      height={height}
      sizes={sizes}
    />
  );
}
