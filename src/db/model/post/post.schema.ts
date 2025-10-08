import { Schema } from "mongoose";
import { IPost } from "../../../shared/interfaces";
import { reactionSchema } from "./reaction.schema";
import { attachmentSchema } from "./attachment.schema";

export const postSchema = new Schema<IPost>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: function() {
            return !this.attachments?.length
        },
        trim: true
    },
    attachments: {
        type: [attachmentSchema],
    },
    reactions: {
        type: [reactionSchema],
    }
}, { timestamps: true });