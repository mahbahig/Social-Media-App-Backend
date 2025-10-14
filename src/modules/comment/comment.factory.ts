import { ObjectId } from "mongoose";
import { IComment, IUser } from "../../shared/interfaces";
import { CommentEntity } from "./comment.entity";
import { CreateCommentDto } from "./dtos";

class CommentFactory {
    async createComment(createCommentDto: CreateCommentDto, user: IUser, postId: string, parentComment: IComment | null): Promise<CommentEntity> {
        const comment = new CommentEntity();
        comment.postId = postId as unknown as ObjectId;
        comment.userId = user._id;
        comment.content = createCommentDto.content;
        comment.parentId = parentComment ? parentComment._id : undefined;
        comment.reactions = [];
        return comment;
    }
}

export default CommentFactory;
