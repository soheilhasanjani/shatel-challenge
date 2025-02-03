import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "./store/features/posts/slice";
import { RootState, AppDispatch } from "./store";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Post Management</h1>
      <PostForm />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <PostList posts={posts} onDelete={(id) => dispatch(deletePost(id))} />
    </div>
  );
};

export default App;
