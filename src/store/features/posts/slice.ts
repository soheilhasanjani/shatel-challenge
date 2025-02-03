import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchPostsApi,
  createPostApi,
  deletePostApi,
  updatePostApi,
} from "../../../apis/posts-api";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetchPostsApi();
  return response.data;
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (post: Omit<Post, "id">, { dispatch }) => {
    await createPostApi(post);
    dispatch(fetchPosts()); // Refetch posts after creation
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: number, { dispatch }) => {
    await deletePostApi(id);
    dispatch(fetchPosts()); // Refetch posts after deletion
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, data }: { id: number; data: Partial<Post> }, { dispatch }) => {
    await updatePostApi(id, data);
    dispatch(fetchPosts()); // Refetch posts after update
  }
);

// Slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      });
  },
});

export default postsSlice.reducer;
