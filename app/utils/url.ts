import { env } from "~/utils/helpers";

/**
 * Builds an asset URL.
 */
export function getAssetUrl(assetPath: string) {
  return getFullUrl(assetPath);
}

/**
 * Builds a fully-qualified internal URL.
 */
export function getFullUrl(pathname: string) {
  return /^http[s]?:\/\//.test(pathname)
    ? pathname
    : `${getBaseUrl()}/${pathname.replace(/^\//, "")}`;
}

/**
 * Builds the base URL for internal fetch requests.
 */
export function getBaseUrl() {
  const host = env("HOST").replace(/\/$/, "");
  const isLocal = /localhost/.test(host);
  const protocol = host ? (isLocal ? "http://" : "https://") : "";
  const port = isLocal ? env("PORT").replace(/^(\d+)/, ":$1") : "";
  // @ts-expect-error
  const basePath = env("BASE_PATH", import.meta.env?.BASE_URL);

  return `${protocol}${host}${port}${basePath}`.replace(/\/$/, "");
}
