import { ObjectId } from "mongoose";

export interface CreatePostDTO {
    content: string;
    // attachments?: IAttachment[];
}