import { IUser } from "../../shared/interfaces";
import { CreatePostDTO } from "./post.dto";
import PostEntity from "./post.entity";

class PostFactory {
    createPost(createPostDTO: CreatePostDTO, user: IUser) {
        const post = new PostEntity();
        post.userId = user._id;
        post.content = createPostDTO.content;
        return post;
    }
}

export default PostFactory;
