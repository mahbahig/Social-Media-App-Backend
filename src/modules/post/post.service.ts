import { IPost, IUser } from '../../shared/interfaces';
import { InternalServerException } from '../../utils';
import { PostRepository } from './../../db/repositories/post.repository';
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
}

export default new PostService();
