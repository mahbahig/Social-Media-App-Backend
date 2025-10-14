import { ObjectId } from "mongoose";
import { IAttachment, IReaction } from "../shared";

export interface IPost {
    _id: ObjectId;
    userId: ObjectId;
    content?: string;
    attachments?: IAttachment[];
    reactions: IReaction[];
    createdAt: Date;
    updatedAt: Date;
}