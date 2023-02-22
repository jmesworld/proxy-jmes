import express from "express";
import { createServer } from "http";
import { createProxyMiddleware } from "http-proxy-middleware";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = 8080;
const API_SERVICE_URL = process.env.API_SERVICE_URL;

const app = express();
const httpServer = createServer(app);

// GET Info endpoint
app.get("/", (req, res, next) => {
  res.sendStatus(200);
});

// Proxy endpoints
app.use(
  "/rpc",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/rpc`]: "",
    },
  })
);

// Start the Proxy
httpServer.listen(PORT, () => console.log(`Listening on port ${port}`));
