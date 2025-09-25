import { compare } from "bcrypt";

/**
 * Securely compares a plain text string with a bcrypt-hashed value.
 * 
 * Typically used for comparing plain texts with stored hashed values, such as passwords or OTPs.
 * 
 * @async
 * @function compareHash
 * @param {Object} params - Object containing the plain text and the hashed value.
 * @param {string} params.plainText - The plain text to compare.
 * @param {string} params.cipherText - The hashed value to compare against.
 * @returns {Promise<boolean>} A promise that resolves to true if the plain text matches the hash, otherwise false.
 */
export const compareHash = async ({ plainText, cipherText }: { plainText: string; cipherText: string }): Promise<boolean> => {
    return await compare(plainText, cipherText);
};