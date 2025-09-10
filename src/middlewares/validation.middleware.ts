import { NextFunction, Request, Response } from "express"
import { ZodType } from "zod"
import { AppError } from "./error.middleware";

type RequestType = keyof Request;
type SchemaType = Partial<Record<RequestType, ZodType>>;

export const validation = (schema: SchemaType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Array to hold validation errors
        let validationErrors: Object[] = [];
        // Validate each part of the request based on the provided schema
        for (const key of Object.keys(schema) as RequestType[]) {
            // Skip if no schema is provided for this part
            if (!schema[key]) continue;
            const result = schema[key].safeParse(req[key]);
            if (!result.success) {
                // Format and collect errors and add to the validationErrors array
                const formattedErrors = result.error.issues.map((err) => ({
                    path: err.path.join("."),
                    message: err.message,
                }));
                validationErrors.push(...formattedErrors);
            }
        }
        // If there are validation errors, respond with 400 and the errors
        if (validationErrors.length) {
            throw new AppError("Validation error", 400, validationErrors);
        }
        next();
    };
};