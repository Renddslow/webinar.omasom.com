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
import { getWebinar, registerForWebinar } from "~/models/webinar.server";

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

export async function action({ request, context, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const payload = {
    firstName: formData.get("first-name")! as string,
    lastName: formData.get("last-name")! as string,
    email: formData.get("email")! as string,
    grade: formData.get("grade")! as string,
    emailConsent: formData.get("send-more") === "on",
  };

  await registerForWebinar(params.webinar!, payload);

  return json({});
}

export function meta({ data }: MetaArgs<typeof loader>) {
  return [
    ...createSeoMetaData({
      title: data?.webinar.title || "",
      description: data?.webinar.description || "",
      image: data?.webinar.image,
      canonical: data?.webinar.url,
    }),
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    createSEOSchemaForVirtualEvent(data?.webinar!),
  ];
}

export { WebinarDetails as default } from "./WebinarDetails";
