import Post from "../../../types/model/Post";

export interface PostSlice {
  posts: Array<Post>;
  loading: boolean;
  error: string | null;
}
