import express from "express";
import userRouter from "./modules/user/user.router";
import { config } from "dotenv";
import { resolve } from "path";
import { apiLimiter, errorHandler, notFound } from "./middlewares";
import helmet from "helmet";
import connectDB from "./db/connectDB";

const bootstrap = (): express.Application => {
    // Load environment variables from .env file
    config({ path: resolve("./config/.env") });

    const app: express.Application = express();
    app.use(express.json());

    // Apply rate limiting middleware to all requests
    app.use(apiLimiter);
    // Helmet
    app.use(helmet());

    // Connect to Database
    connectDB();

    // Define routes for its corresponding router of each module
    app.use("/api/users", userRouter);

    app.use("{/*demo}", notFound);
    app.use(errorHandler);

    return app;
};

export default bootstrap;