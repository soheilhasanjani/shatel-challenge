import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { fetchPosts } from "../store/features/posts/slice";
import { RootState } from "../store";

const useGetPosts = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector(
    (state: RootState) => state.post
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const memoizedReturn = useMemo(
    () => ({
      data: posts,
      loading,
      error,
    }),
    [error, loading, posts]
  );

  return memoizedReturn;
};

export default useGetPosts;
