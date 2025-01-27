import React from "react";

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const PostCard: React.FC<PostCardProps> = ({ id, title, body, userId }) => {
  return (
    <div className="flex flex-col gap-2 border border-blue-400 ring-4 ring-blue-100 rounded h-full">
      <div className="">{title}</div>
      <div className="line-clamp-3">{body}</div>
      <div className="">{userId}</div>
    </div>
  );
};

export default PostCard;
