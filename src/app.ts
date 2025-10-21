import express from "express";
import { apiLimiter, errorHandler, notFound, unifyResponse } from "./middlewares";
import helmet from "helmet";
import { authRouter, commentRouter, postRouter, userRouter } from "./modules";
import { connectDB } from "./db";

const bootstrap = (): express.Application => {
    const app: express.Application = express();
    app.use(express.json());

    // Apply rate limiting middleware to all requests
    app.use(apiLimiter);
    // Helmet
    app.use(helmet());

    // Connect to Database
    connectDB();

    // Unifying response middleware
    app.use(unifyResponse)

    // Define routes for its corresponding router of each module
    app.use("/api/auth", authRouter);
    app.use("/api/user", userRouter);
    app.use("/api/post", postRouter);
    app.use("/api/comment", commentRouter);

    // Handle 404 - Keep this as the last route
    app.use("{/*demo}", notFound);

    // Error handling middleware - Keep this as the last piece of middleware
    app.use(errorHandler);

    return app;
};

export default bootstrap;
