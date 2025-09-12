import { model, models } from "mongoose";
import { userSchema } from "./user.schema";
import { IUser } from "../../../shared/interfaces";

const User = models.User || model<IUser>('User', userSchema);

export default User;