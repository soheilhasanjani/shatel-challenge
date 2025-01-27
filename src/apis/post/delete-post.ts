import httpRequest from "../../config/http-request";

export const deletePost = async (id: number) => {
  const { data } = await httpRequest<number>({
    url: "/posts/" + id,
  });

  return data;
};
