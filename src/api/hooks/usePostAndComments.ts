import { useEffect, useState } from "react";
import { Comment, Post, RequestStatus, User } from "../postTypes";
import { getCommentsByPostId, getPostById, getUserById } from "../postCalls";
import useToast from "../../providers/ToastContext/useToast";

const usePostAndComments = (
  postId: number
): {
  postData?: Post;
  userData?: User;
  commentsData: Comment[];
  overallRequestStatus: RequestStatus[];
} => {
  const [postData, setPostData] = useState<Post>();
  const [userData, setUserData] = useState<User>();
  const [commentsData, setCommentsData] = useState<Comment[]>([]);
  const [postRequestStatus, setPostRequestStatus] = useState<RequestStatus>(
    RequestStatus.IDLE
  );
  const [commentsRequestStatus, setCommentsRequestStatus] =
    useState<RequestStatus>(RequestStatus.IDLE);

  const { createToast } = useToast();

  const getPostData = () => {
    setPostRequestStatus(RequestStatus.LOADING);

    getPostById(postId)
      .then((post) => {
        setPostData(post);

        return getUserById(post.userId);
      })
      .then((user) => {
        setUserData(user);
        setPostRequestStatus(RequestStatus.OK);
        createToast({ text: "Post Loaded!" });
      })
      .catch((e) => {
        createToast({ text: e.message, type: "ERROR", timeOut: 10000 });
        return setPostRequestStatus(RequestStatus.ERROR);
      });
  };

  const getCommentsData = () => {
    setCommentsRequestStatus(RequestStatus.LOADING);

    getCommentsByPostId(postId)
      .then((comments) => {
        setCommentsData(comments);
        setCommentsRequestStatus(RequestStatus.OK);
        createToast({ text: "Comments Loaded!" });
      })
      .catch((e) => {
        createToast({ text: e.message, type: "ERROR", timeOut: 10000 });
        return setCommentsRequestStatus(RequestStatus.ERROR);
      });
  };

  useEffect(() => {
    getPostData();
    getCommentsData();
  }, []);

  const overallRequestStatus = [postRequestStatus, commentsRequestStatus];

  return { postData, userData, commentsData, overallRequestStatus };
};

export default usePostAndComments;
