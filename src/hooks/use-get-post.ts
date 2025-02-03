import { useEffect, useMemo } from "react";
import { RootState } from "../store";
import { fetchPostById } from "../store/features/posts/slice";
import { useAppDispatch, useAppSelector } from "./redux-hooks";

const useGetPost = (postId: number) => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector(
    (state: RootState) => state.post
  );

  const post = posts.find((p) => p.id === postId);

  useEffect(() => {
    if (postId && !post) {
      dispatch(fetchPostById({ id: postId }));
    }
  }, [postId, post, dispatch]);

  const memoizedReturn = useMemo(
    () => ({
      data: post,
      loading,
      error,
    }),
    [error, loading, post]
  );

  return memoizedReturn;
};

export default useGetPost;
