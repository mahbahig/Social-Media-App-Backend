import { UpdateResult } from "mongoose";
import { IPost, PostReaction } from "../../shared";
import { Post } from "../models";
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