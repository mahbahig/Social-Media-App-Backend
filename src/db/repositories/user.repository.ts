import { HydratedDocument, Model } from "mongoose";
import { DbRepository } from "./db.repository";
import { AppError } from "../../middlewares";
import { IUser } from "../../modules/user/user.interface";

export class UserRepository extends DbRepository<IUser> {
    constructor(protected readonly model: Model<IUser>) {
        super(model);
    }

    async createOneUser(data: Partial<IUser>): Promise<HydratedDocument<IUser>> {
        const user: HydratedDocument<IUser> = await super.create(data);
        if (!user) throw new AppError("Failed to create user", 500);
        return user;
    }
}