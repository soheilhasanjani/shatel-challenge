import httpRequest from "../../config/http-request";
import { Post } from "../../store/features/post/post-slice.type";

export const getPosts = async () => {
  const { data } = await httpRequest<Array<Post>>({
    url: "/posts",
  });

  return data;
};
