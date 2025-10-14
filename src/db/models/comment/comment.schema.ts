import { Schema } from "mongoose";
import { IComment } from "../../../shared/interfaces";
import { attachmentSchema, reactionSchema } from "../common";

export const commentSchema = new Schema<IComment>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    content: {
        type: String,
    },
    reactions: [reactionSchema],
    attachments: [attachmentSchema]
})