import httpRequest from "../../config/http-request";
import { Post } from "../../store/features/post/post-slice.type";

export const createPost = async (dto: Omit<Post, "id">) => {
  const { data } = await httpRequest<Post>({
    method: "POST",
    url: "/posts",
    data: dto,
  });

  return data;
};
