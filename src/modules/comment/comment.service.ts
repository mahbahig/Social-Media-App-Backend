import { ObjectId, Types } from "mongoose";
import { PostRepository, CommentRepository } from "../../db";
import { IComment, IUser } from "../../shared/interfaces";
import CommentFactory from "./comment.factory";
import { CreateCommentDto } from "./dtos";
import { BadRequestException, ForbiddenException, NotFoundException, UnauthorizedException } from "../../utils";

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
            // Validate parent comment id
            if (!Types.ObjectId.isValid(commentId)) throw new BadRequestException("Invalid comment id");
            // Check if parent comment exists
            parentComment = await this._commentRepository.exists({ _id: commentId });
            if (!parentComment) throw new NotFoundException("Parent comment not found");
            // Ensure the parent comment belongs to the same post
            if (parentComment.postId.toString() !== postId) throw new BadRequestException("Parent comment does not belong to the specified post");
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
        const comment = await this._commentRepository.exists({ _id: id }, {}, { populate: [{ path: "replies" }] });
        if (!comment) throw new NotFoundException("Comment not found");

        return comment;
    };
    /********************************* Update Comment *********************************/
    updateComment = async (id: string, userId: ObjectId, content: string) => {
        // Validate comment id
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException("Invalid comment id");

        // Check if comment exists
        const comment = await this._commentRepository.exists({ _id: id });
        if (!comment) throw new NotFoundException("Comment not found");

        // Check if the user is the owner of the comment
        if (comment.userId.toString() !== userId.toString()) throw new UnauthorizedException("You are not authorized to delete this comment");

        // Check if content is provided and different
        if (!content) throw new BadRequestException("Content is required");
        if (comment.content == content) throw new BadRequestException("Content is the same as before");

        // Update the comment
        await this._commentRepository.updateById(new Types.ObjectId(id), { content });
    };
    /********************************* Delete Comment *********************************/
    deleteComment = async (id: string, userId: ObjectId) => {
        // Validate comment id
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException("Invalid comment id");

        // Check if comment exists
        const comment = await this._commentRepository.exists({ _id: id });
        if (!comment) throw new NotFoundException("Comment not found");

        // Check if user is authorized to delete the comment
        if (comment.userId.toString() !== userId.toString()) throw new UnauthorizedException("You are not authorized to delete this comment");

        // Delete comment from DB
        await this._commentRepository.deleteById(new Types.ObjectId(id));
    };
}

export default new CommentService();
