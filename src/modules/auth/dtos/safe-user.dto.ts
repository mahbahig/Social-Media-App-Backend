import { ObjectId } from "mongoose";
import { UserRole } from "../../../shared/enums";

export interface SafeUserDTO {
    id: ObjectId;
    username: string;
    email: string;
    role: UserRole;
}
