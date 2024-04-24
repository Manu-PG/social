import { useNavigate, useParams } from "react-router-dom";
import usePostDetail from "../../api/hooks/usePostDetail";
import { RequestStatus } from "../../api/postTypes";
import DetailedPostHeader from "./components/DetailedPostHeader";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorPlaceholder from "../../components/ErrorPlaceholder";
import { CenterElementContainer, PostDetailedContainer } from "./PostDetail.styled";
import DetailedPost from "./components/DetailedPost";
import Comments from "../../components/Comments";

const PostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { postDetail, requestStatus } = usePostDetail(Number(postId));

  if (requestStatus === RequestStatus.LOADING) {
    return (
      <PostDetailedContainer>
        <DetailedPostHeader onClick={() => navigate("/")} />
        <CenterElementContainer>
          <LoadingSpinner />
        </CenterElementContainer>
      </PostDetailedContainer>
    );
  }

  if (requestStatus === RequestStatus.ERROR) {
    return (
      <PostDetailedContainer>
        <DetailedPostHeader onClick={() => navigate("/")} />
        <CenterElementContainer>
          <ErrorPlaceholder />{" "}
        </CenterElementContainer>
      </PostDetailedContainer>
    );
  }

  return (
    <PostDetailedContainer>
      <DetailedPostHeader onClick={() => navigate("/")} />
      <DetailedPost
        account={`@${postDetail?.user?.username}`}
        name={postDetail?.user?.name || ""}
        text={postDetail?.body || ""}
      />
      <Comments commentsData={postDetail?.comments} />
    </PostDetailedContainer>
  );
};

export default PostDetail;
