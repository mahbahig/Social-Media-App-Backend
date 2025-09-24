import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * @param token - The JWT token to verify.
 * @param key - The secret key used to verify the token. 
 * @returns The decoded token payload if the token is valid, otherwise throws an error.
 */
export const VerifyToken = ({ token, key }: { token: string, key: string }): JwtPayload | string => {
    return jwt.verify(token, key);
};
