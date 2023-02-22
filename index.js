import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = 8080;
const HOST = "localhost";
const API_SERVICE_URL = process.env.API_SERVICE_URL;

const app = express();

// GET Info endpoint
app.get("/", (req, res, next) => {
  res
    .sendStatus(200)
    .send("This is a proxy service which proxies to JMES RPC.");
});

// Proxy endpoints
app.use(
  "/rpc/",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/`]: "",
    },
  })
);

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
