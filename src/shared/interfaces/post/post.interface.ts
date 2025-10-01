import { ObjectId } from "mongoose";
import { IAttachment } from "./attachment.interface";
import { IReaction } from "./reaction.interface";

export interface IPost {
    _id: ObjectId;
    userId: ObjectId;
    content?: string;
    attachments?: IAttachment[];
    reactions: IReaction[];
    createdAt: Date;
    updatedAt: Date;
}