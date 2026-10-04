// Vercel Serverless Function entry point
const app = require("../server/dist/app.js").default;

module.exports = app;
