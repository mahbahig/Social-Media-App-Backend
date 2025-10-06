import { CreatePostDTO } from './post.dto';
import { Request, Response } from "express";
import PostService from "./post.service";
import { IPost } from '../../shared/interfaces';

class PostController {
    /********************************* Create Post *********************************/
    createPost = async (req: Request, res: Response) => {
        const createPostDTO: CreatePostDTO = req.body;
        const post: Partial<IPost> = await PostService.createPost(createPostDTO, req.user!);
        return res.status(201).json(post);
    };
}

export default new PostController();
