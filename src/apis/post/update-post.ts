import httpRequest from "../../config/http-request";
import { Post } from "../../store/features/post/post-slice.type";

export const updatePost = async (dto: Post) => {
  const { id, ...reqData } = dto;
  const { data } = await httpRequest<Post>({
    method: "PUT",
    url: "/posts/" + id,
    data: reqData,
  });

  return data;
};
