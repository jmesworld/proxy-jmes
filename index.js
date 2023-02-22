import express from "express";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

const PORT = 8080;
const HOST = "localhost";
const API_SERVICE_URL = "http://51.38.52.37:1889";

const app = express();
app.use(morgan("dev")); //logging

// GET Info endpoint
app.get("/info", (req, res, next) => {
  res.send("This is a proxy service which proxies to JMES RPC.");
});

// Proxy endpoints
app.use(
  "/",
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
