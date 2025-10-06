import { ObjectId } from "mongoose";
import { IAttachment, IReaction } from "../../shared/interfaces";

class PostEntity {
    userId!: ObjectId;
    content!: string;
    // reactions: IReaction[] = []
    // attachments: IAttachment[] = [];
}

export default PostEntity;