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
    parentId: Schema.Types.ObjectId,
    content: {
        type: String,
    },
    reactions: [reactionSchema],
    attachments: [attachmentSchema]
}, { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true });

commentSchema.virtual("replies", {
    ref: "Comment",
    localField: "_id",
    foreignField: "parentId"
});
commentSchema.pre("deleteOne", async function (next) {
    const filter = typeof this.getFilter == "function" ? this.getFilter() : {};
    const replies = await this.model.find({ parentId: filter._id });
    if (replies.length) {
        for (const reply of replies) {
            await this.model.deleteOne({ _id: reply._id});
        }
    }
    next();
});