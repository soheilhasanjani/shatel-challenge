// postsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Post, PostsState } from "./post-slice.type";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../../../apis/post";
import statusGenerator from "../../../utils/statusGenerator";

// Initial state
const initialState: PostsState = {
  posts: [],
  status: {
    fetch: { isPending: false, isError: false, isSuccess: false, error: null },
    add: { isPending: false, isError: false, isSuccess: false, error: null },
    update: { isPending: false, isError: false, isSuccess: false, error: null },
    delete: { isPending: false, isError: false, isSuccess: false, error: null },
  },
};

export const fetchPostsAsync = createAsyncThunk<Post[]>(
  "posts/fetch-posts",
  async () => {
    const response = await getPosts();
    return response.data;
  }
);

export const addPostAsync = createAsyncThunk<Post, Omit<Post, "id">>(
  "posts/add-post",
  async (newPost) => {
    const response = await createPost();
    return response.data;
  }
);

export const updatePostAsync = createAsyncThunk<Post, Post>(
  "posts/update-post",
  async (updatedPost) => {
    const { id, ...postData } = updatedPost;
    const response = await updatePost();
    return response.data;
  }
);

export const deletePostAsync = createAsyncThunk<number, number>(
  "posts/delete-post",
  async (postId) => {
    await deletePost();
    return postId;
  }
);

// Slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPostsAsync.pending, (state) => {
        state.status.fetch = statusGenerator("pending");
      })
      .addCase(
        fetchPostsAsync.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.status.fetch = statusGenerator("fulfilled");
          state.posts = action.payload;
        }
      )
      .addCase(fetchPostsAsync.rejected, (state, action) => {
        state.status.fetch = statusGenerator("rejected");
        state.error = action.error.message || "Failed to fetch posts";
      })
      // Add Post
      .addCase(addPostAsync.pending, (state) => {
        state.status.add = statusGenerator("pending");
      })
      .addCase(addPostAsync.fulfilled, (state, action: PayloadAction<Post>) => {
        state.status.add = statusGenerator("fulfilled");
        state.posts.push(action.payload);
      })
      .addCase(addPostAsync.rejected, (state, action) => {
        state.status.add = statusGenerator("rejected");
        state.error = action.error.message || "Failed to add post";
      })
      // Update Post
      .addCase(updatePostAsync.pending, (state) => {
        state.status.update = statusGenerator("pending");
      })
      .addCase(
        updatePostAsync.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.status.update = statusGenerator("fulfilled");
          const index = state.posts.findIndex(
            (post) => post.id === action.payload.id
          );
          if (index !== -1) {
            state.posts[index] = action.payload;
          }
        }
      )
      .addCase(updatePostAsync.rejected, (state, action) => {
        state.status.update = statusGenerator("rejected");
        state.error = action.error.message || "Failed to update post";
      })
      // Delete Post
      .addCase(deletePostAsync.pending, (state) => {
        state.status.delete = statusGenerator("pending");
      })
      .addCase(
        deletePostAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status.delete = statusGenerator("fulfilled");
          state.posts = state.posts.filter(
            (post) => post.id !== action.payload
          );
        }
      )
      .addCase(deletePostAsync.rejected, (state, action) => {
        state.status.delete = statusGenerator("rejected");
        state.error = action.error.message || "Failed to delete post";
      });
  },
});

export default postsSlice.reducer;
