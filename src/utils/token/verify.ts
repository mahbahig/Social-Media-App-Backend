import jwt, { JwtPayload } from "jsonwebtoken";
import { devConfig } from "../../config/dev.config";

/**
 * Verifies a JWT token using the provided secret key.
 * 
 * Typically used to authenticate requests by ensuring the token is valid and has not been tampered with. If the token is valid, it returns the decoded payload.
 * If not, it throws an error.
 * 
 * @function verifyToken
 * @param {Object} params
 * @param {string} params.token - The JWT token to verify.
 * @param {string} [params.key] - The secret key used to verify the token. 
 * @returns {JwtPayload|string} The decoded token payload if verification is successful.
 * @throws {jwt.JsonWebTokenError|jwt.TokenExpiredError} If the token is invalid or expired.
 */
export const verifyToken = ({ token, key = devConfig.USER_ACCESS_JWT_SECRET! }: { token: string, key?: string }): JwtPayload | string => {
    return jwt.verify(token, key);
};
