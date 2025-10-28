import { ObjectId } from "mongoose";
import { IAttachment, IReaction } from "../../shared";

class PostEntity {
    userId!: ObjectId;
    content!: string;
    // reactions: IReaction[] = []
    // attachments: IAttachment[] = [];
}

export default PostEntity;