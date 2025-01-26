import httpRequest from "../../config/http-request";

export const getPosts = async () => {
  const { data } = await httpRequest({
    url: "",
  });

  return data;
};
