import { IPost } from "../../shared/interfaces";
import { Post } from "../model";
import { DbRepository } from "./db.repository";

export class PostRepository extends DbRepository<IPost> {
    constructor() {
        super(Post);
    }
}