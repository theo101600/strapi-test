import { FullImageProps } from "@/types";
import { StrapiImage } from "@/components/StrapiImage";

export function FullImage({ image }: Readonly<FullImageProps>) {
  if (!image?.data) {
    return null;
  }

  const { url, alternativeText } = image.data.attributes;

  return (
    <div className="article-image">
      <StrapiImage
        src={url}
        alt={alternativeText || "No alternative text provided"}
        width={1920}
        height={1080}
        className="article-image__image"
      />
    </div>
  );
}
