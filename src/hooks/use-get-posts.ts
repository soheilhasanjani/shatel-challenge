import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { getPostsAsync } from "../store/features/post/post-slice";
import { RootState } from "../store";

const useGetPosts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state: RootState) => state.post.posts);

  useEffect(() => {
    dispatch(getPostsAsync());
  }, [dispatch]);

  return { ...posts };
};

export default useGetPosts;
