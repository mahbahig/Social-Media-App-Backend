import { CreatePostDTO } from "./post.dto";
import { Request, Response } from "express";
import PostService from "./post.service";
import { IPost } from "../../shared/interfaces";
import { PostReaction } from "../../shared/enums";

class PostController {
    /********************************* Create Post *********************************/
    createPost = async (req: Request, res: Response) => {
        const createPostDTO: CreatePostDTO = req.body;
        const post: Partial<IPost> = await PostService.createPost(createPostDTO, req.user!);
        return res.status(201).json(post);
    };

    /********************************* Get Post *********************************/
    getPost = async (req: Request, res: Response) => {
        const id: string = req.params.postId!;
        const post: IPost = await PostService.getPost(id);
        return res.status(200).json({ post });
    };

    /********************************* Toggle Reaction *********************************/
    toggleReaction = async (req: Request, res: Response) => {
        const postId: string = req.params.postId!;
        const userId: string = req.user!._id.toString();
        const reaction: PostReaction = req.body.reaction;
        const status = await PostService.toggleReaction(postId, userId, reaction);
        return res.status(200).json({ message: `Reaction ${status} successfully` });
    };
}

export default new PostController();
