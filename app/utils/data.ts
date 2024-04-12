import type { MetaDescriptor } from "@remix-run/node";
import { SEO_TITLE_TEMPLATE } from "~/constants";

export function createSeoMetaData({
  title,
  description,
  image,
  canonical,
}: {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
}) {
  const meta: MetaDescriptor[] = [
    {
      title: SEO_TITLE_TEMPLATE.replace(/\{\{title}}/, title),
    },
    {
      name: "description",
      value: description,
    },
    { property: "og:title", content: title },
    { property: "og:url", content: canonical },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "twitter:url", content: canonical },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];

  return meta;
}
