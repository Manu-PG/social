import { useContext, useEffect, useState } from "react";
import { getPaginatedPosts, getUsersByIds } from "../../api/postCalls";
import { Post, RequestStatus } from "../../api/postTypes";
import useToast from "../../providers/ToastContext/useToast";
import { PostContext } from "../../providers/PostContext";
import { includesInsensitive } from "../../utils";

const usePostList = (page?: number, limit?: number, filter?: string) => {
  const { postData, setPostData } = useContext(PostContext);
  const [resultPosts, setResultPosts] = useState<Post[]>([]);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.IDLE);
  const { createToast } = useToast();

  const fetchPosts = (page: number, limit: number) => {
    setRequestStatus(RequestStatus.LOADING);

    const startIndexId = (page - 1) * limit + 1;
    const endIndexId = startIndexId + limit - 1;
    const temporalPosts = postData.filter(
      ({ id }) => id !== undefined && startIndexId <= id && id <= endIndexId
    );

    if (temporalPosts.length === limit) {
      setResultPosts(temporalPosts);
      setRequestStatus(RequestStatus.OK);
      //createToast({ text: "Post recover from local" });
    } else {
      getPostData(page, limit, temporalPosts)
        .then(() => {
          createToast({ text: "Post loaded from API" });
          setRequestStatus(RequestStatus.OK);
        })
        .catch((error) => {
          setRequestStatus(RequestStatus.ERROR);
          createToast({ text: error.message, timeOut: 10000, type: "ERROR" });
        });
    }
  };

  const getPostData = async (_page: number, _limit: number, temporalPosts: Post[]) => {
    const apiPosts = await getPaginatedPosts({ _page, _limit });

    const postIds = temporalPosts.map(({ id }) => id);

    const mergedPosts = [...postData, ...apiPosts.filter(({ id }) => !postIds.includes(id))];
    const populatedPostWithUsers = await populateUsers(mergedPosts);
    const sortedPosts = populatedPostWithUsers.sort(sortPostHandler);

    if (sortedPosts.length !== postData.length) {
      setPostData(sortedPosts);
    } else {
      setResultPosts([]);
    }
  };

  const sortPostHandler = (a: Post, b: Post) => {
    if (!a.id || !b.id) return 0;
    else if (a.id > b.id) return 1;
    else if (a.id < b.id) return -1;
    return 0;
  };

  const populateUsers = async (postList: Post[]) => {
    const postWithEmptyUsers = postList.filter((post) => !post.user);

    if (postWithEmptyUsers.length) {
      const userIds = postWithEmptyUsers.map(({ userId }) => userId);
      const userList = await getUsersByIds(userIds);
      createToast({
        text: `Users loaded from API id: ${userList.map(({ id }) => id)}`,
        timeOut: 5000,
      });

      return postList.map((post) => {
        const user = userList.find(({ id }) => id === post.userId);
        return {
          ...post,
          user: user ? user : post.user,
        };
      });
    } else return postList;
  };

  const filterPosts = (filter: string) => {
    setResultPosts(
      postData.filter((post) => {
        const { user, body } = post;
        const nameFilter = user && includesInsensitive(user.name, filter);
        const usernameFilter = user && includesInsensitive(user.username, filter);
        const bodyFilter = includesInsensitive(body, filter);
        return nameFilter || usernameFilter || bodyFilter;
      })
    );
  };

  useEffect(() => {
    if (filter && filter !== "") filterPosts(filter);
    else fetchPosts(page || 1, limit || postData.length);
  }, [page, limit, postData, filter]);

  return {
    resultPosts,
    requestStatus,
  };
};

export default usePostList;
