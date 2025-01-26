import httpRequest from "../../config/http-request";

export const getPost = async () => {
  const { data } = await httpRequest({
    url: "",
  });

  return data;
};
