import { ObjectId } from "mongoose"
import { IAttachment, IReaction } from "../shared";

export interface IComment {
    _id: ObjectId;
    postId: ObjectId;
    userId: ObjectId;
    content: string;
    parentsId: ObjectId[];
    reactions: IReaction[];
    attachments: IAttachment[];
}