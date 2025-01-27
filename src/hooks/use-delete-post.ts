import { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { deletePostAsync } from "../store/features/post/post-slice";

const useDeletePost = () => {
  const dispatch = useAppDispatch();
  const deletePost = useAppSelector(
    (state: RootState) => state.post.deletePost
  );

  const mutate = (dto: number) => {
    return dispatch(deletePostAsync(dto));
  };

  return { mutate, ...deletePost };
};

export default useDeletePost;
