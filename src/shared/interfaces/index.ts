import { IUser } from "./user/user.interface";

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export * from "./user";
export * from "./post";
export * from "./comment";
export * from "./shared";
export * from "./request";