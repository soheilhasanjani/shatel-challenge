import httpRequest from "../../config/http-request";

export const createPost = async () => {
  const { data } = await httpRequest({
    url: "",
  });

  return data;
};
