import { ObjectId } from "mongoose";
import { IAttachment, IReaction } from "../../shared/interfaces";

export class CommentEntity {
    postId!: ObjectId;
    userId!: ObjectId;
    content!: string;
    parentsId?: ObjectId[];
    reactions!: IReaction[];
    attachments?: IAttachment[];
}
