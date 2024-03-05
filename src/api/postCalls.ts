import axios from "axios";
import { Comment, Post, User } from "./postTypes";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getAllPosts = () => {
  return axios.get<Post[]>(`${BASE_URL}/posts`).then(({ data }) => data);
};

export const getPostById = (postId: number) => {
  return axios
    .get<Post>(`${BASE_URL}/posts/${postId}`)
    .then(({ data }) => data);
};

export const getUserById = (userId: number) => {
  return axios
    .get<User>(`${BASE_URL}/users/${userId}`)
    .then(({ data }) => data);
};

export const getUsersByIds = (userIds: number[]) => {
  const uniqueUserIds = [...new Set(userIds)];

  return axios
    .get<User[]>(`${BASE_URL}/users`, { params: { id: uniqueUserIds } })
    .then(({ data }) => data);
};

export const getCommentsByPostId = (postId: number) => {
  return axios
    .get<Comment[]>(`${BASE_URL}/post/${postId}/comments`)
    .then(({ data }) => data);
};
