import { PostRepository } from '../../db';
import { PostReaction } from '../../shared/enums';
import { IPost, IUser } from '../../shared/interfaces';
import { InternalServerException, NotFoundException } from '../../utils';
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

    /********************************* Toggle Reaction *********************************/
    toggleReaction = async (postId: string, userId: string, reactionType: PostReaction) => {
        const post = await this._postRepository.exists({ _id: postId });
        if (!post) throw new NotFoundException("Post not found");

        // Check if the user has already reacted with the same type
        const existingUser = post.reactions.findIndex((reaction) => {
            return reaction.userId.toString() == userId;
        });
        if (existingUser == -1) {
            // If the user did not react before, add the reaction
            await this._postRepository.updateOne({ _id: postId }, { $push: { reactions: { userId, reaction: reactionType } } });
            return "added";
        } else {
            if (post.reactions[existingUser]?.reaction == reactionType) {
                // If the user reacted before with the same type, remove the reaction
                await this._postRepository.updateOne({ _id: postId }, { $pull: { reactions: { userId, reaction: reactionType } } });
                return "removed";
            } else {
                // If the user reacted before with a different type, update the reaction
                await this._postRepository.updateOne(
                    { _id: postId, "reactions.userId": userId },
                    { $set: { "reactions.$.reaction": reactionType } }
                );
                return "updated";
            }
        }
    };
}

export default new PostService();