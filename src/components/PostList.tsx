import React, { useState } from "react";
import { deletePostApi, fetchPostByIdApi } from "../apis/posts-api";
import PostForm from "./PostForm";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostListProps {
  posts: Post[];
  onDelete: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onDelete }) => {
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handleDelete = async (id: number) => {
    await deletePostApi(id);
    onDelete(id);
  };

  const handleEdit = async (id: number) => {
    const response = await fetchPostByIdApi(id);
    setEditingPost(response.data);
  };

  return (
    <div>
      {editingPost && (
        <PostForm post={editingPost} onUpdate={() => setEditingPost(null)} />
      )}
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="border p-4 mb-2">
            <h2 className="font-bold">{post.title}</h2>
            <p>{post.body}</p>
            <p className="text-sm text-gray-500">User ID: {post.userId}</p>
            <button
              onClick={() => handleEdit(post.id)}
              className="text-blue-500 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(post.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
