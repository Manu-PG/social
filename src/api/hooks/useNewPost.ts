import { useContext, useState } from "react";
import { postNewPost } from "../../api/postCalls";
import { Post, RequestStatus } from "../../api/postTypes";
import { PostContext } from "../../providers/PostContext";

const useNewPost = () => {
  const { postData, setPostData } = useContext(PostContext);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.IDLE);
  const [localPosts, setLocalPosts] = useState<Post[]>([]);

  const sendNewPost = (newPostText: string) => {
    setRequestStatus(RequestStatus.LOADING);

    const newPost: Post = {
      userId: 4,
      title: newPostText,
      body: newPostText,
    };

    return postNewPost(newPost)
      .then((post) => {
        setLocalPosts((currentLocalPosts) => [
          ...currentLocalPosts,
          { ...post, id: Number(new Date()) }, //falsear Id, no usar en entorno real
        ]);
        setRequestStatus(RequestStatus.IDLE);
      })
      .catch((error) => {
        setRequestStatus(RequestStatus.ERROR);
        throw error;
      });
  };

  return { sendNewPost, requestStatus };
};

export default useNewPost;
