import z from "zod";
import { CreatePostDTO } from "./post.dto";
import { ObjectId } from "mongoose";

export const createPostSchema = {
    body: z.object<CreatePostDTO>({
        userId: z.string().length(24).trim() as unknown as ObjectId,
        content: z.string("Content is required").min(1, "Content cannot be empty").max(500, "Content cannot exceed 500 characters").trim() as unknown as string,
    })
};