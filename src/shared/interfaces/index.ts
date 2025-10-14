import { IUser } from "./user/user.interface";

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export * from "./user/index";
export * from "./post/index";
export * from "./comment/index";
export * from "./shared/index";