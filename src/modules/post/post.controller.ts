import { CreatePostDTO } from "./post.dto";
import { Request, Response } from "express";
import PostService from "./post.service";
import { IPost } from "../../shared/interfaces";
import { PostReaction } from "../../shared/enums";

class PostController {
    /********************************* Create Post *********************************/
    createPost = async (req: Request, res: Response) => {
        const createPostDTO: CreatePostDTO = req.body;
        const post = await PostService.createPost(createPostDTO, req.user!);
        return res.status(201).json({ message: "Post created successfully", post });
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

    /********************************* Update Post *********************************/
    updatePost = async (req: Request, res: Response) => {
        const id: string = req.params.postId!;
        const content: string = req.body.content;
        await PostService.updatePost(id, req.user!._id.toString(), content);
        return res.status(200).json({ message: "Post updated successfully" });
    };

    /********************************* Delete Post *********************************/
    deletePost = async (req: Request, res: Response) => {
        const id: string = req.params.postId!;
        await PostService.deletePost(id, req.user!._id.toString());
        return res.status(200).json({ message: "Post deleted successfully" });
    };
}

export default new PostController();
