import { HydratedDocument } from "mongoose";
import { AbstractRepository } from "./abstract.repository";
import { IUser } from "../../shared/interfaces/user/user.interface";
import { InternalServerException } from "../../utils";
import { User } from "../models";


export class UserRepository extends AbstractRepository<IUser> {
    constructor() {
        super(User);
    }

    async getAllUsers(): Promise<HydratedDocument<IUser>[]> {
        const users: HydratedDocument<IUser>[] = await this.model.find();
        if (!users) throw new InternalServerException("Failed to get users");
        return users;
    }
}