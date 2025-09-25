import { hash } from "bcrypt"

/**
 * Hashes a plain text string using bcrypt.
 * 
 * Typically used for securely storing sensitive information like passwords.
 * 
 * @async
 * @function compareHash
 * @param {Object} params - An object containing the plain text and optional salt rounds.
 * @param {string} params.plainText - The plain text to compare.
 * @param {number} [params.saltRounds] - The number of salt rounds to use. Default value is environment variable SALT_ROUNDS.
 * @returns {Promise<string>} A promise that resolves to the hashed string.
 */
export const hashValue = async ({ plainText, saltRounds = Number(process.env.SALT_ROUNDS) }: { plainText: string, saltRounds?: number }): Promise<string> => {
    return hash(plainText, saltRounds);
}