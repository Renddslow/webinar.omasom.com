import type { RequestContext } from "./server/types";

declare global {
  namespace Express {
    interface Request {
      context: RequestContext;
    }
  }
}
