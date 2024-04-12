import type { AppLoadContext } from "@remix-run/node";
import type { Request, Response } from "express";

/**
 * Creates a Remix load context.
 */
export async function createRemixContext(
  req: Request,
  res: Response
): Promise<AppLoadContext> {
  return {};
}
