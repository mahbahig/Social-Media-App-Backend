import { IComment } from "../../shared/interfaces";
import { Comment } from "../model";
import { AbstractRepository } from "./abstract.repository";

export class CommentRepository extends AbstractRepository<IComment> {
    constructor() {
        super(Comment)
    }
}