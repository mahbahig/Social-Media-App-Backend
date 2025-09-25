import express from "express";
import { apiLimiter, errorHandler, notFound } from "./middlewares";
import helmet from "helmet";
import connectDB from "./db/connection";
import authRouter from "./modules/auth/auth.router";

const bootstrap = (): express.Application => {
    // Load environment variables from .env file

    const app: express.Application = express();
    app.use(express.json());

    // Apply rate limiting middleware to all requests
    app.use(apiLimiter);
    // Helmet
    app.use(helmet());

    // Connect to Database
    connectDB();

    // Define routes for its corresponding router of each module
    app.use("/api/auth", authRouter);

    app.use("{/*demo}", notFound);
    app.use(errorHandler);

    return app;
};

export default bootstrap;
