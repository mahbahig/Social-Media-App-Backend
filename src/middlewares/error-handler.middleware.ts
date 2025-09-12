import {  Request, Response, NextFunction } from "express";
import { AppError } from "../utils";

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).send({ success: false, message, details: err.details });
};