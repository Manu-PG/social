import {
  StyledIcon,
  MessageContainer,
  NewPostContainer,
  StyledButton,
  StyledTextArea,
  HorizontalDividerBar,
  BottomAreaContainer,
  LimitCounter,
  VerticalDividerBar,
  StyledSpinner,
} from "./NewPost.styled";
import { RequestStatus } from "../../api/postTypes";
import { useState } from "react";
import useNewPost from "../../api/hooks/useNewPost";

type NewPostProps = {
  charsLimit: number;
};

const NewPost = ({ charsLimit }: NewPostProps) => {
  const { sendNewPost, requestStatus } = useNewPost();
  const [postMessage, setPostMessage] = useState<string>("");

  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const charsLeft = charsLimit - postMessage.length;

  const isExtendedView = isInputFocused || postMessage;

  return (
    <NewPostContainer>
      <StyledIcon colorByText="Patricia Lebsack" />
      <MessageContainer>
        <StyledTextArea
          value={postMessage}
          onChange={({ target }) => setPostMessage(target.value)}
          placeholder="What's going on?!"
          maxLength={charsLimit}
          onFocusChange={(isInFocus) => setIsInputFocused(isInFocus)}
        />
        {isExtendedView ? <HorizontalDividerBar /> : null}
        <BottomAreaContainer>
          {isExtendedView ? (
            <>
              <LimitCounter $charsCount={charsLeft}>{charsLeft}</LimitCounter>
              <VerticalDividerBar />
            </>
          ) : null}
          <StyledButton
            onClick={() => {
              sendNewPost(postMessage)
                .then(() => setPostMessage(""))
                .catch(() => {}); //<- evitar que vacie el textArea asi es feo, otra forma?
            }}
            disabled={!postMessage.length}
            showError={requestStatus === RequestStatus.ERROR}
          >
            {requestStatus === RequestStatus.LOADING ? <StyledSpinner /> : "Send"}
          </StyledButton>
        </BottomAreaContainer>
      </MessageContainer>
    </NewPostContainer>
  );
};

export default NewPost;
