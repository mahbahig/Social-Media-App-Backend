import { Schema } from "mongoose";
import { PostReaction } from "../../../shared/enums";

export const reactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reaction: {
        type: Number,
        enum: PostReaction,
        default: PostReaction.like
    }
}, { timestamps: true });