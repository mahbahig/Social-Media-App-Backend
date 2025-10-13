import { Types } from "mongoose";
import { PostRepository } from '../../db';
import { PostReaction } from '../../shared/enums';
import { IPost, IUser } from '../../shared/interfaces';
import { BadRequestException, InternalServerException, NotFoundException } from '../../utils';
import { CreatePostDTO } from "./post.dto";
import PostFactory from './post.factory';

class PostService {
    private readonly _postRepository = new PostRepository();
    private readonly _postFactory = new PostFactory();

    /********************************* Create Post *********************************/
    createPost = async (createPostDTO: CreatePostDTO, user: IUser) => {
        const post = this._postFactory.createPost(createPostDTO, user);
        const createdPost: Partial<IPost> = await this._postRepository.create(post);
        if (!createdPost) throw new InternalServerException("Failed to create post");
        return createdPost;
    };

    /********************************* Get Post *********************************/
    getPost = async (postId: string) => {
        if (!Types.ObjectId.isValid(postId)) throw new NotFoundException("Invalid post id");

        const post: IPost | null = await this._postRepository.findById(postId, {}, { populate: [
            { path: "userId", select: "username firstName lastName" },
            { path: "reactions.userId", select: "username firstName lastName" }
        ]});
        if (!post) throw new NotFoundException("Post not found");

        return post;
    };

    /********************************* Toggle Reaction *********************************/
    toggleReaction = async (postId: string, userId: string, reaction: PostReaction) => {
        if (!Types.ObjectId.isValid(postId)) throw new NotFoundException("Invalid post id");
        if (!Types.ObjectId.isValid(userId)) throw new NotFoundException("Invalid user id");
        if (!reaction) throw new BadRequestException("Reaction type is required");

        const post = await this._postRepository.exists({ _id: postId });
        if (!post) throw new NotFoundException("Post not found");

        // Check if the user has already reacted with the same type
        const existingUser = post.reactions.findIndex((reaction) => {
            return reaction.userId.toString() == userId;
        });

        if (existingUser == -1) {
            // If the user did not react before, add the reaction
            await this._postRepository.addReaction({ postId, userId, reaction });
            return "added";
        } else {
            if (post.reactions[existingUser]?.reaction == reaction) {
                // If the user reacted before with the same type, remove the reaction
                await this._postRepository.removeReaction({ postId, userId, reaction });
                return "removed";
            } else {
                // If the user reacted before with a different type, update the reaction
                await this._postRepository.updateReaction({ postId, userId, reaction });
                return "updated";
            }
        }
    };
}

export default new PostService();