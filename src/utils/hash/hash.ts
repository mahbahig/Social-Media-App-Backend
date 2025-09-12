import { hash } from "bcrypt"

export const Hash = async ({ plainText, saltRounds = Number(process.env.SALT_ROUNDS) }: { plainText: string, saltRounds?: number }): Promise<string> => {
    return hash(plainText, saltRounds);
}