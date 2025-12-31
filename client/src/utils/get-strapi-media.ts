import { getStrapiURL } from "@/utils/get-strapi-url";

export function getStrapiMedia(url?: string | null) {
  if (!url) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return getStrapiURL() + url;
}
