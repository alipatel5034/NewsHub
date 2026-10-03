import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        code: "INVALID_QUERY",
        message: "Invalid input parameters",
        details: err.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("; "),
      },
    });
  }

  const message = err.message || "An unexpected error occurred.";

  if (message.startsWith("INVALID_API_KEY")) {
    return res.status(401).json({
      success: false,
      error: {
        code: "INVALID_API_KEY",
        message: "The server's GNews API key is invalid or unauthorized.",
      },
    });
  }

  if (message.startsWith("RATE_LIMIT_EXCEEDED")) {
    return res.status(429).json({
      success: false,
      error: {
        code: "NEWS_PROVIDER_RATE_LIMITED",
        message: "Upstream news provider rate limit reached. Please try again later.",
      },
    });
  }

  if (message.startsWith("REQUEST_TIMEOUT")) {
    return res.status(504).json({
      success: false,
      error: {
        code: "NEWS_PROVIDER_TIMEOUT",
        message: "Upstream news provider request timed out.",
      },
    });
  }

  return res.status(502).json({
    success: false,
    error: {
      code: "NEWS_PROVIDER_UNAVAILABLE",
      message: message,
    },
  });
}
