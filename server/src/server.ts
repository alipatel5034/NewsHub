import app from "./app";
import { env, isApiKeyConfigured } from "./config/env";

const server = app.listen(env.PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 NewsHub Server running on http://localhost:${env.PORT}`);
  console.log(`🌍 Environment: ${env.NODE_ENV}`);
  console.log(`🔑 GNews API Key Configured: ${isApiKeyConfigured() ? "YES ✅" : "NO (Sample Mode Active) ⚠️"}`);
  console.log(`==================================================\n`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});
