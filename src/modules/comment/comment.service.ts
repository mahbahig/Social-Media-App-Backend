import { PostRepository, CommentRepository } from "../../db";
import CommentFactory from "./comment.factory";

class CommentService {
    private readonly _postRepository = new PostRepository();
    private readonly _commentRepository = new CommentRepository();
    private readonly _commentFactory = new CommentFactory();

    
}

export default new CommentService();
