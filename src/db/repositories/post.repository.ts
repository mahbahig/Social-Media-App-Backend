import { IPost } from "../../shared/interfaces";
import { Post } from "../model/post/post.model";
import { DbRepository } from "./db.repository";

export class PostRepository extends DbRepository<IPost> {
    constructor() {
        super(Post);
    }
}