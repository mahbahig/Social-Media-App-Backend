import { ObjectId } from "mongoose";
import { UserGender, UserProvider, UserRole } from "../../enums";

export interface IUser {
    _id: ObjectId;
    firstName: string;
    lastName?: string;
    username?: string;
    email: string;
    password: string;
    age?: number;
    gender?: UserGender;
    profilePicture?: string;
    role: UserRole;
    provider: UserProvider;
    confirmed: boolean;
    createdAt: Date;
    updatedAt: Date;
    otp?: string;
    otpExpiration?: Date;
    friends: ObjectId[];
    blocked: ObjectId[];
}