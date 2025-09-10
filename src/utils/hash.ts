import { hash, compare } from "bcrypt"

export const Hash = async ({ plainText, saltRounds = Number(process.env.SALT_ROUNDS) }: { plainText: string, saltRounds?: number }): Promise<string> => {
    return hash(plainText, saltRounds);
}

export const Compare = async ({ plainText, cipherText }: { plainText: string, cipherText: string }): Promise<boolean> => {
    return compare(plainText, cipherText);
};