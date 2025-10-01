import { ObjectId } from "mongoose";
import { IAttachment } from "./attachment.interface";

export interface IPost {
    _id: ObjectId;
    userId: ObjectId;
    content?: string;
    attachments?: IAttachment[];
    likes: ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}