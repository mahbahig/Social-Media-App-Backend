import jwt from "jsonwebtoken";

/**
 * Generates a JWT token.
 * @param payload - The payload to include in the token.
 * @param key - The secret key to sign the token.
 * @param options - Optional settings for the token (e.g., expiration).
 * @return The generated JWT token.
*/
export const GenerateToken = ({ payload, key, options }: { payload: object, key: string, options?: jwt.SignOptions }): string => {
    return jwt.sign(payload, key, options);
}