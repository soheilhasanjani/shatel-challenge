import httpRequest from "../../config/http-request";

export const updatePost = async () => {
  const { data } = await httpRequest({
    url: "",
  });

  return data;
};
