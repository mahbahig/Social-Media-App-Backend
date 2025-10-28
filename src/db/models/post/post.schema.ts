import { Schema } from "mongoose";
import { IPost } from "../../../shared";
import { attachmentSchema, reactionSchema } from "../common";
import { Comment } from "../comment";

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
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

postSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "postId"
});

postSchema.pre("deleteOne", async function (next) {
    const filter = typeof this.getFilter == "function" ? this.getFilter() : {};
    await Comment.deleteMany({ postId: filter._id });
});