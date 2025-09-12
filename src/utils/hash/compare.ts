import { compare } from "bcrypt";

export const Compare = async ({ plainText, cipherText }: { plainText: string, cipherText: string }): Promise<boolean> => {
    return compare(plainText, cipherText);
};