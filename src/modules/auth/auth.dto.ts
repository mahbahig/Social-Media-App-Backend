import { ObjectId } from "mongoose";
import { UserGender, UserRole } from "../../shared/enums";

export interface RegisterDTO {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    age?: number;
    gender?: UserGender;
}
export interface ConfirmEmailDTO {
    email: string;
    otp: string;
}
export interface LoginDTO {
    email: string;
    password: string;
}
export interface SafeUserDTO {
    id: ObjectId;
    username: string;
    email: string;
    role: UserRole;
}