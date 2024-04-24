import { Link } from "react-router-dom";
import { RequestStatus } from "../../../../api/postTypes";
import ErrorPlaceholder from "../../../../components/ErrorPlaceholder";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { CenterElementContainer, StyledCompactPost } from "./PostListResult.styled";
import usePostList from "../../../../api/hooks/usePostsList";

type PostListProps = {
  page?: number;
  limit?: number;
  filter?: string;
};

const PostListResult = ({ page, limit, filter }: PostListProps) => {
  const { resultPosts, requestStatus } = usePostList(page, limit, filter);

  if (requestStatus === RequestStatus.IDLE || requestStatus === RequestStatus.LOADING) {
    return (
      <CenterElementContainer>
        <LoadingSpinner />
      </CenterElementContainer>
    );
  }

  if (requestStatus === RequestStatus.ERROR) {
    return (
      <CenterElementContainer>
        <ErrorPlaceholder />
      </CenterElementContainer>
    );
  }

  return resultPosts.map((postData) => {
    const { id, body, user } = postData;

    return (
      <Link key={id} to={`post/${id}`} relative="path">
        <StyledCompactPost account={`@${user?.username}`} name={user?.name || ""} text={body} />
      </Link>
    );
  });
};

export default PostListResult;
