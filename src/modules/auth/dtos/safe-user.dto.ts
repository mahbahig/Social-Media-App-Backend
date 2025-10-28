import { ObjectId } from "mongoose";
import { UserRole } from "../../../shared";

export interface SafeUserDTO {
    id: ObjectId;
    username: string;
    email: string;
    role: UserRole;
}
