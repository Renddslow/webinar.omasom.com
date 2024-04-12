import type { MetaDescriptor } from "@remix-run/node";
import { OSM_ORG_SCHEMA, SEO_TITLE_TEMPLATE } from "~/constants";
import type { Presenter, Webinar } from "~/api/types";

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

export function createEventSchema({
  title,
  description,
  image,
  presenters,
  startsAt,
  url,
}: Webinar) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    eventAttendanceMode: "online",
    inLanguage: "en-US",
    name: title,
    description,
    image,
    organizer: OSM_ORG_SCHEMA,
    performers: presenters.map((presenter) => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: presenter.name,
      image: presenter.image,
    })),
    startDate: new Date(startsAt).toISOString(),
    url,
  };
}

export function createSEOSchemaForVirtualEvent(
  webinar: Webinar
): MetaDescriptor {
  return {
    "script:ld+json": {
      ...createEventSchema(webinar),
      location: {
        "@context": "https://schema.org",
        "@type": "VirtualLocation",
        url: `${webinar.url}/meet`,
      },
    },
  };
}
