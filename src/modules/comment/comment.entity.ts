import { ObjectId } from "mongoose";
import { IAttachment, IReaction } from "../../shared/interfaces";

export class CommentEntity {
    postId!: ObjectId;
    userId!: ObjectId;
    content!: string;
    parentId?: ObjectId;
    reactions!: IReaction[];
    attachments?: IAttachment[];
}
