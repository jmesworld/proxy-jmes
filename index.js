import express from "express";
import { createServer } from "http";
import { createProxyMiddleware } from "http-proxy-middleware";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = 8000;
const API_SERVICE_URL = process.env.API_SERVICE_URL;

const app = express();
const httpServer = createServer(app);

// GET Info endpoint
app.get("/", (req, res, next) => {
  res.sendStatus(200);
});


app.use(
  "/cosmos/bank/v1beta1/balances/:address",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/cosmos/bank/v1beta1/balances/": "/cosmos/bank/v1beta1/balances/",
    },
  })
);


// Start the Proxy
httpServer.listen(PORT, () => console.log(`Proxy listening on port ${PORT}`));
