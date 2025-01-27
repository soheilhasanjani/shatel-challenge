import { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { createPostAsync } from "../store/features/post/post-slice";
import { Post } from "../store/features/post/post-slice.type";

const useCreatePost = () => {
  const dispatch = useAppDispatch();
  const createPost = useAppSelector(
    (state: RootState) => state.post.createPost
  );

  const mutate = (dto: Omit<Post, "id">) => {
    return dispatch(createPostAsync(dto));
  };

  return { mutate, ...createPost };
};

export default useCreatePost;
