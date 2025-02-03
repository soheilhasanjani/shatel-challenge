import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../store/features/posts/slice";
import { createPostApi, updatePostApi } from "../apis/posts-api";

interface Post {
  id?: number;
  title: string;
  body: string;
  userId: number;
}

const PostForm: React.FC<{ post?: Post; onUpdate?: () => void }> = ({
  post,
  onUpdate,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<Post>();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("body", post.body);
      setValue("userId", post.userId);
    }
  }, [post, setValue]);

  const onSubmit = async (data: Post) => {
    if (post?.id) {
      await updatePostApi(post.id, data);
      onUpdate?.();
    } else {
      await createPostApi(data);
      dispatch(fetchPosts());
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <input
        {...register("title")}
        placeholder="Title"
        className="border p-2 w-full mb-2"
      />
      <textarea
        {...register("body")}
        placeholder="Body"
        className="border p-2 w-full mb-2"
      />
      <input
        {...register("userId")}
        type="number"
        placeholder="User ID"
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        {post ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;
