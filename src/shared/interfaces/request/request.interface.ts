import { Types } from "mongoose";
import { UserRequestStatus, UserRequestType } from "../../enums";

export interface IUserRequest {
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
    status: UserRequestStatus;
    type: UserRequestType;
}