import { HydratedDocument, Model } from "mongoose";
import { DbRepository } from "./db.repository";
import { IUser } from "../../shared/interfaces/user/user.interface";
import { AppError } from "../../utils";
import User from "../model/user/user.model";

export class UserRepository extends DbRepository<IUser> {
    constructor() {
        super(User);
    }

    async getAllUsers(): Promise<HydratedDocument<IUser>[]> {
        const users: HydratedDocument<IUser>[] = await this.model.find();
        if (!users) throw new AppError("Failed to get users", 500);
        return users;
    }
}