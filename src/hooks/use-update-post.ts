import { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { updatePostAsync } from "../store/features/post/post-slice";
import { Post } from "../store/features/post/post-slice.type";

const useUpdatePost = () => {
  const dispatch = useAppDispatch();
  const updatePost = useAppSelector(
    (state: RootState) => state.post.updatePost
  );

  const mutate = (dto: Post) => {
    return dispatch(updatePostAsync(dto));
  };

  return { mutate, ...updatePost };
};

export default useUpdatePost;
