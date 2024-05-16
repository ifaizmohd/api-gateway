import dotenv from "dotenv";
import express, { Application } from "express";
import path from "path";
dotenv.config({
  path: path.join(__dirname, `../config/.env.${process.env.NODE_ENV}`),
});
import cluster from "cluster";
import os from "os";
import bodyParser from "body-parser";
import {
  authenticationMiddleware,
  rateLimitingMiddleware,
} from "./middlewares";
import { AuthRouter } from "./controllers/AuthController";

const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use(authenticationMiddleware);
app.use(rateLimitingMiddleware);

// API routes
app.use("/auth", AuthRouter);
app.get("/api/resource", (req, res) => {
  // Handle request logic
  res.send("Response from service");
});

// Cluster mode
if (cluster.isPrimary && process.env.NODE_ENV === "production") {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
