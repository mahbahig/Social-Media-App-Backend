import { UpdateResult } from "mongoose";
import { PostReaction } from "../../shared/enums";
import { IPost } from "../../shared/interfaces";
import { Post } from "../model";
import { AbstractRepository } from "./abstract.repository";

export class PostRepository extends AbstractRepository<IPost> {
    constructor() {
        super(Post);
    }

    async addReaction({ postId, userId, reaction }: { postId: string; userId: string; reaction: PostReaction }): Promise<UpdateResult> {
        return await this.model.updateOne({ _id: postId }, { $push: { reactions: { userId, reaction } } });
    }

    async updateReaction({ postId, userId, reaction }: { postId: string; userId: string; reaction: PostReaction }): Promise<UpdateResult> {
        return await this.model.updateOne({ _id: postId, "reactions.userId": userId }, { $set: { "reactions.$.reaction": reaction } });
    }

    async removeReaction({ postId, userId, reaction }: { postId: string; userId: string; reaction: PostReaction }): Promise<UpdateResult> {
        return await this.model.updateOne({ _id: postId }, { $pull: { reactions: { userId, reaction } } });
    }
}