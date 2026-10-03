import { Router } from "express";
import { isApiKeyConfigured } from "../config/env";

const router = Router();

router.get("/", (_req, res) => {
  const hasKey = isApiKeyConfigured();
  res.json({
    success: true,
    status: "ok",
    timestamp: new Date().toISOString(),
    apiKeyConfigured: hasKey,
    message: hasKey
      ? "GNews API key is configured and active."
      : "GNews API key is missing or set to placeholder. Sample mode active."
  });
});

export default router;
