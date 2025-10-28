import { model, models } from "mongoose";
import { userRequestSchema } from "./user-request.schema";

export const UserRequest = models.Request || model("Request", userRequestSchema);