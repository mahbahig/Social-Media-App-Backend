import { model, models } from "mongoose";
import { postSchema } from "./post.schema";

export const Post = models.Post || model("Post", postSchema);