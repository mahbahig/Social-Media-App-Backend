import { ObjectId, Types } from 'mongoose';
import { PostRepository, CommentRepository } from "../../db";
import { IComment, IUser } from "../../shared/interfaces";
import CommentFactory from "./comment.factory";
import { CreateCommentDto } from "./dtos";
import { BadRequestException, ForbiddenException, NotFoundException } from '../../utils';

class CommentService {
    private readonly _postRepository = new PostRepository();
    private readonly _commentRepository = new CommentRepository();
    private readonly _commentFactory = new CommentFactory();

    /********************************* Create Comment *********************************/
    createComment = async (createCommentDto: CreateCommentDto, user: IUser, postId: string, commentId: string | undefined) => {
        // Validate post id
        if (!Types.ObjectId.isValid(postId)) throw new BadRequestException("Invalid post id");

        // Check if post exists
        const post = await this._postRepository.exists({ _id: postId });
        if (!post) throw new NotFoundException("Post not found");

        // Check if commentId is provided (reply to comment), if provided check if comment exists
        let parentComment: IComment | null = null;
        if (commentId) {
            if (!Types.ObjectId.isValid(commentId)) throw new BadRequestException("Invalid comment id");
            parentComment = await this._commentRepository.exists({ _id: commentId });
            if (!parentComment) throw new NotFoundException("Parent comment not found");
        }

        // Send data to factory to create comment
        const comment: Partial<IComment> = await this._commentFactory.createComment(createCommentDto, user, postId, parentComment);

        // Send comment to repository to save it in DB
        const createdComment = await this._commentRepository.create(comment);
        return createdComment;
    };
    /********************************* Get Comment By Id *********************************/
    getCommentById = async (id: string) => {
        // Validate comment id
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException("Invalid comment id");

        // Check if comment exists
        const comment = await this._commentRepository.exists(
            { _id: id },
            {},
            { populate: [{ path: "replies" }] },
        );
        if (!comment) throw new NotFoundException("Comment not found");

        return comment;
    };
    /********************************* Delete Comment *********************************/
    deleteComment = async (id: string, userId: ObjectId) => {
        // Validate comment id
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException("Invalid comment id");

        // Check if comment exists
        const comment = await this._commentRepository.exists({ _id: id });
        if(!comment) throw new NotFoundException("Comment not found");
        
        // Check if user is authorized to delete the comment
        if (comment.userId != userId) throw new ForbiddenException("You are not authorized to delete this comment");

        // Delete comment from DB
        await this._commentRepository.deleteById(new Types.ObjectId(id));
    };
}

export default new CommentService();
