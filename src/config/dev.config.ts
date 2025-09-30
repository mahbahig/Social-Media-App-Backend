import { config } from "dotenv";

config({ path: "./.env" });

export const devConfig = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    ADMIN_ACCESS_JWT_SECRET: process.env.ADMIN_ACCESS_JWT_SECRET,
    USER_ACCESS_JWT_SECRET: process.env.USER_ACCESS_JWT_SECRET,
};