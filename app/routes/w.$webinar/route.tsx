import { json } from "@remix-run/node";

import type {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  MetaArgs,
} from "@remix-run/node";
import {
  createSeoMetaData,
  createSEOSchemaForVirtualEvent,
} from "~/utils/data";
import type { Webinar } from "~/api/types";
import { getWebinar } from "~/models/webinar.server";

interface WebinarRouteLoaderData {
  webinar: Webinar;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const webinar = await getWebinar(params.webinar!);

  if (!webinar) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json<WebinarRouteLoaderData>({
    webinar,
  });
}

export function meta({ data }: MetaArgs<typeof loader>) {
  return [
    ...createSeoMetaData({
      title: data?.webinar.title || "",
      description: data?.webinar.description || "",
      image: data?.webinar.image,
      canonical: data?.webinar.url,
    }),
    createSEOSchemaForVirtualEvent(data?.webinar!),
  ];
}

export { WebinarDetails as default } from "./WebinarDetails";
