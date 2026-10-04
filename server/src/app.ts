import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import { apiRateLimiter } from "./middleware/rateLimiter.middleware";
import { errorHandler } from "./middleware/error.middleware";
import healthRoutes from "./routes/health.routes";
import newsRoutes from "./routes/news.routes";

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/api", apiRateLimiter);

app.use("/api/health", healthRoutes);
app.use("/api/news", newsRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: "The requested API endpoint does not exist.",
    },
  });
});

app.use(errorHandler);

export default app;
