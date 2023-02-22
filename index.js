import express from "express";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";
import * as dotenv from 'dotenv';
dotenv.config()

const PORT = 8080;
const HOST = "localhost";
const API_SERVICE_URL = process.env.API_SERVICE_URL;

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
