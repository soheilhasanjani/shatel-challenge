import { Query } from "../../../utils/query-maker";

// Define the Post type
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// Define the state shape
export interface PostsState {
  posts: Query<Array<Post>>;
  post: Query<Post | undefined>;
  createPost: Query<Post | undefined>;
  updatePost: Query<Post | undefined>;
  deletePost: Query<Post | undefined>;
}
