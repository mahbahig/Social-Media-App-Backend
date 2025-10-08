import { ObjectId } from "mongoose";
import { PostReaction } from "../../enums";

export interface IReaction {
    userId: ObjectId;
    reaction: PostReaction;
}