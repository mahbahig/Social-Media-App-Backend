import { Types } from "mongoose";
import { UserGender, UserProvider, UserRole } from "../db/model/user.model";

export interface IUser {
    _id: Types.ObjectId,
    firstName: string,
    lastName?: string,
    username: string,
    email: string,
    password: string,
    age?: number,
    gender?: UserGender,
    profilePicture?: string,
    role: UserRole,
    provider: UserProvider,
    isVerified: boolean,
    createdAt: Date,
    updatedAt: Date,
}