import { NextFunction, Request, Response } from "express"
import { ZodType } from "zod"
import { ValidationException } from "../utils";

type RequestType = keyof Request;
type SchemaType = Partial<Record<RequestType, ZodType>>;

export const validation = (schema: SchemaType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Validate each part of the request based on the provided schema
        for (const key of Object.keys(schema) as RequestType[]) {
            // Skip if no schema is provided for this part
            if (!schema[key]) continue;
            const result = schema[key].safeParse(req[key]);
            // Check if validation failed
            if (!result.success) {
                // Format and collect errors and add to the validationErrors array
                const formattedErrors = result.error.issues.map((issue) => ({
                    path: issue.path[0],
                    message: issue.message
                }));
                throw new ValidationException("Validation error", formattedErrors);
            }
        }
        next();
    };
};