import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPostsApi = () => axios.get(API_URL);
export const createPostApi = (data: any) => axios.post(API_URL, data);
export const deletePostApi = (id: number) => axios.delete(`${API_URL}/${id}`);
export const fetchPostByIdApi = (id: number) => axios.get(`${API_URL}/${id}`);
export const updatePostApi = (id: number, data: any) =>
  axios.put(`${API_URL}/${id}`, data);
