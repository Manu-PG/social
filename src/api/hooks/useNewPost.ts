import { useState } from "react";
import { Post, RequestStatus } from "../postTypes";
import { postNewPost } from "../postCalls";

const useNewPost = (
  setLocalPosts: React.Dispatch<React.SetStateAction<Post[]>>
) => {
  const [newPostText, setNewPostText] = useState<string>("");
  const [newPostRequestStatus, setNewPostRequestStatus] =
    useState<RequestStatus>(RequestStatus.IDLE);

  const sendNewPost = (newPostText: string) => {
    setNewPostRequestStatus(RequestStatus.LOADING);

    const newPost: Post = {
      userId: 4,
      title: newPostText,
      body: newPostText,
    };

    postNewPost(newPost)
      .then((post) => {
        setLocalPosts((currentLocalPosts) => [
          ...currentLocalPosts,
          { ...post, id: Number(new Date()) }, //falsear Id, no usar en entorno real
        ]);
        setNewPostText("");
        setNewPostRequestStatus(RequestStatus.IDLE);
      })
      .catch(() => {
        setNewPostRequestStatus(RequestStatus.ERROR);
      });
  };

  return { newPostText, setNewPostText, newPostRequestStatus, sendNewPost };
};

export default useNewPost;
