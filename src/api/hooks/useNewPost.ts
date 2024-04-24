import { useContext, useState } from "react";
import { postNewPost } from "../../api/postCalls";
import { Post, RequestStatus } from "../../api/postTypes";
import useToast from "../../providers/ToastContext/useToast";
import { PostContext } from "../../providers/PostContext";

const useNewPost = () => {
  const { postData, setPostData } = useContext(PostContext);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.IDLE);
  const [localPosts, setLocalPosts] = useState<Post[]>([]);

  const { createToast } = useToast();

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
        createToast({ text: "Post Sent!" });
      })
      .catch((error) => {
        setRequestStatus(RequestStatus.ERROR);
        createToast({ text: error.message, type: "ERROR", timeOut: 10000 });
        throw new Error(error);
      });
  };

  return { sendNewPost, requestStatus };
};

export default useNewPost;
