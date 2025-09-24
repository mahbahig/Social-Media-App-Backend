import { compare } from "bcrypt";

/**
 * Compares a plain text value to a hashed value.
 * @param plainText - The plain text to compare.
 * @param cipherText - The hashed value to compare against.
 * @returns True if the plain text matches the hash, otherwise false.
 */
export const Compare = async ({ plainText, cipherText }: { plainText: string, cipherText: string }): Promise<boolean> => {
    return await compare(plainText, cipherText);
};