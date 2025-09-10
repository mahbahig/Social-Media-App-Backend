import {  Request, Response, NextFunction } from "express";

export class AppError extends Error {
    constructor(public message: string, public statusCode?: number, public details?: Object[]) {
        super(message);
    }
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    throw new AppError("Invalid API endpoint", 404);
};

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    if (err.details) {
        return res.status(statusCode).send({ success: false, message, errors: err.details });
    }
    return res.status(statusCode).send({ success: false, message });
};