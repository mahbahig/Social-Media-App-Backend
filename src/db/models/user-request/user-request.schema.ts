import { Schema } from "mongoose";
import { UserRequestStatus, IUserRequest } from "../../../shared";
import { UserRequestType } from "../../../shared/enums/user-request/user-request-type.enum";

export const userRequestSchema = new Schema<IUserRequest>(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: Number,
            enum: UserRequestStatus,
            default: UserRequestStatus.pending,
        },
        type: {
            type: Number,
            enum: UserRequestType
        }
    },
    {
        timestamps: true,
        strict: true
    },
);