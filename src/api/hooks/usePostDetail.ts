import { useContext, useEffect, useState } from "react";
import { Comment, Post, RequestStatus } from "../postTypes";
import { getCommentsByPostId, getPostById, getUserById } from "../postCalls";
import useToast from "../../providers/ToastContext/useToast";
import { PostContext } from "../../providers/PostContext";

const usePostDetail = (postId: number) => {
  const { postData, setPostData } = useContext(PostContext);
  const [postDetail, setPostDetail] = useState<Post>();
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.IDLE);
  const { createToast } = useToast();

  const fetchPostDetails = async () => {
    const localPost = postData.find(({ id }) => id === postId);

    setRequestStatus(RequestStatus.LOADING);
    const promisePost = getPost(postId, localPost);
    const promiseComments = getComments(postId, localPost?.comments);

    const [resolvedPost, resolvedComments] = await Promise.all([promisePost, promiseComments]);
    resolvedPost.comments = resolvedComments;

    if (!localPost || !localPost.user || !localPost.comments) {
      setPostData((currentValues) => [
        ...currentValues.filter(({ id }) => id !== postId),
        resolvedPost,
      ]);
    }
    setPostDetail(resolvedPost);
    setRequestStatus(RequestStatus.OK);
  };

  const getPost = async (postId: number, localPost?: Post) => {
    if (localPost && localPost.user) {
      //createToast({ text: "Post recover from local" });
      return localPost;
    } else {
      const tempPost = await getPostById(postId);
      tempPost.user = await getUserById(tempPost.userId);
      createToast({ text: "Post loaded from API" });
      return tempPost;
    }
  };

  const getComments = async (postId: number, localComments?: Comment[]) => {
    if (localComments) {
      //createToast({ text: "Comments recover from local" });
      return localComments;
    } else {
      const tempComments = await getCommentsByPostId(postId);
      createToast({ text: "Comments loaded from API" });
      return tempComments;
    }
  };

  useEffect(() => {
    fetchPostDetails().catch((error) => {
      setRequestStatus(RequestStatus.ERROR);
      createToast({ text: error.message, timeOut: 10000, type: "ERROR" });
    });
  }, [postId]);

  return { postDetail, requestStatus };
};

export default usePostDetail;
