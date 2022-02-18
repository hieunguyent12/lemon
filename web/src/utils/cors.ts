import { NextApiRequest, NextApiResponse } from "next";

interface TCorsOptions {
  origins?: string[];
  maxAge?: string;
  allowMethods?: string[];
  allowHeaders?: string[];
  allowCredentials?: boolean;
  exposeHeaders?: any[];
}

const DEFAULT_ALLOW_METHODS = [
  "POST",
  "GET",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
];

const DEFAULT_ALLOW_HEADERS = [
  "Origin",
  "X-Requested-With",
  "Access-Control-Allow-Origin",
  "X-HTTP-Method-Override",
  "Content-Type",
  "Authorization",
  "Accept",
];

const DEFAULT_MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours

const cors =
  (options: TCorsOptions) =>
  (handler: any) =>
  (req: NextApiRequest, res: NextApiResponse, ...restArgs: any) => {
    const {
      origins = "*",
      maxAge = DEFAULT_MAX_AGE_SECONDS,
      allowMethods = DEFAULT_ALLOW_METHODS,
      allowHeaders = DEFAULT_ALLOW_HEADERS,
      allowCredentials = true,
      exposeHeaders = [],
    } = options;

    if (req.headers.origin && origins.includes(req.headers.origin)) {
      res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    }

    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
      res.end();
      return false;
    }

    return handler(req, res, ...restArgs);
  };

export default cors;
