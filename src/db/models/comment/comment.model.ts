import { model, models } from "mongoose";
import { IComment } from "../../../shared/interfaces";
import { commentSchema } from "./comment.schema";

export const Comment = models.Comment || model<IComment>('Comment', commentSchema);