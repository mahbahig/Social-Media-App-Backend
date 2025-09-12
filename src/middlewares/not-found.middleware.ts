import { NextFunction, Request, Response } from "express";
import { NotFoundException } from "../utils";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    throw new NotFoundException("Invalid API endpoint");
};