// postsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Post, PostsState as PostState } from "./post-slice.type";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../../../apis/post";
import { queryMaker, statusGenerator } from "../../../utils/query-maker";

// Initial state
const initialState: PostState = {
  posts: queryMaker([]),
  post: queryMaker(undefined),
  createPost: queryMaker(undefined),
  updatePost: queryMaker(undefined),
  deletePost: queryMaker(undefined),
};

export const getPostsAsync = createAsyncThunk<Post[]>(
  "posts/get-posts",
  async () => {
    const res = await getPosts();
    return res;
  }
);

export const createPostAsync = createAsyncThunk<Post, Omit<Post, "id">>(
  "posts/create-post",
  async (dto) => {
    const res = await createPost(dto);
    return res;
  }
);

export const updatePostAsync = createAsyncThunk<Post, Post>(
  "posts/update-post",
  async (dto) => {
    const res = await updatePost(dto);
    return res;
  }
);

export const deletePostAsync = createAsyncThunk<number, number>(
  "posts/delete-post",
  async (id) => {
    const res = await deletePost(id);
    return res;
  }
);

// Slice
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(getPostsAsync.pending, (state) => {
        state.posts = {
          ...state.posts,
          ...statusGenerator({ status: "pending" }),
        };
      })
      .addCase(
        getPostsAsync.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.posts = {
            data: action.payload,
            ...statusGenerator({ status: "fulfilled" }),
          };
        }
      )
      .addCase(getPostsAsync.rejected, (state, action) => {
        state.posts = {
          ...state.posts,
          ...statusGenerator({
            status: "rejected",
            error: action.error.message ?? "Failed to fetch posts",
          }),
        };
      })
      // Add Post
      .addCase(createPostAsync.pending, (state) => {
        state.createPost = {
          ...state.post,
          ...statusGenerator({ status: "pending" }),
        };
      })
      .addCase(
        createPostAsync.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.createPost = {
            data: action.payload,
            ...statusGenerator({ status: "fulfilled" }),
          };
        }
      )
      .addCase(createPostAsync.rejected, (state, action) => {
        state.post = {
          ...state.post,
          ...statusGenerator({
            status: "rejected",
            error: action.error.message ?? "Failed to fetch post",
          }),
        };
      })
      // Update Post
      .addCase(updatePostAsync.pending, (state) => {
        state.updatePost = {
          ...state.updatePost,
          ...statusGenerator({ status: "pending" }),
        };
      });
    // .addCase(
    //   updatePostAsync.fulfilled,
    //   (state, action: PayloadAction<Post>) => {
    //     state.status.update = statusGenerator("fulfilled");
    //     const index = state.posts.findIndex(
    //       (post) => post.id === action.payload.id
    //     );
    //     if (index !== -1) {
    //       state.posts[index] = action.payload;
    //     }
    //   }
    // )
    // .addCase(updatePostAsync.rejected, (state, action) => {
    //   state.status.update = statusGenerator("rejected");
    //   state.error = action.error.message || "Failed to update post";
    // })
    // // Delete Post
    // .addCase(deletePostAsync.pending, (state) => {
    //   state.status.delete = statusGenerator("pending");
    // })
    // .addCase(
    //   deletePostAsync.fulfilled,
    //   (state, action: PayloadAction<number>) => {
    //     state.status.delete = statusGenerator("fulfilled");
    //     state.posts = state.posts.filter(
    //       (post) => post.id !== action.payload
    //     );
    //   }
    // )
    // .addCase(deletePostAsync.rejected, (state, action) => {
    //   state.status.delete = statusGenerator("rejected");
    //   state.error = action.error.message || "Failed to delete post";
    // });
  },
});

export default postSlice.reducer;
