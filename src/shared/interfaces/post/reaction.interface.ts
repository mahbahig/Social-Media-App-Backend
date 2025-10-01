import { PostReaction } from "../../enums";

export interface IReaction {
    userId: string;
    reaction: PostReaction;
}