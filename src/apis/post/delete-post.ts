import httpRequest from "../../config/http-request";

export const deletePost = async () => {
  const { data } = await httpRequest({
    url: "",
  });

  return data;
};
