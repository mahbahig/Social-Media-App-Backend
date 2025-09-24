import { hash } from "bcrypt"

/**
 * Hashes a plain text value.
 * @param plainText - The plain text to compare.
 * @param saltRounds - The number of salt rounds to use. Default is taken from environment variable SALT_ROUNDS.
 * @returns The hashed value.
 */
export const Hash = async ({ plainText, saltRounds = Number(process.env.SALT_ROUNDS) }: { plainText: string, saltRounds?: number }): Promise<string> => {
    return hash(plainText, saltRounds);
}