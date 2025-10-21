import { Request, Response } from "express";
import { CreateCommentDto } from "./dtos";
import CommentService from "./comment.service";

class CommentController {
    /********************************* Create Comment *********************************/
    createComment = async (req: Request, res: Response) => {
        const createCommentDTO: CreateCommentDto = req.body;
        const postId: string = req.params.postId!;
        const commentId: string | undefined = req.params.commentId;
        const comment = await CommentService.createComment(createCommentDTO, req.user!, postId, commentId);
        res.status(201).json({ message: "Comment created successfully", comment });
    };
    
    /********************************* Get Comment By Id *********************************/
    getCommentById = async (req: Request, res: Response) => {
        const id: string = req.params.id!;

        const comment = await CommentService.getCommentById(id);
        res.status(200).json({ message: "Comment fetched successfully", comment });
    };
}

export default new CommentController();
