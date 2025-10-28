import { model, models } from "mongoose";
import { userSchema } from "./user.schema";
import { IUser } from "../../../shared";

export const User = models.User || model<IUser>('User', userSchema);