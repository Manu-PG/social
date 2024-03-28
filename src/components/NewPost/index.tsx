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

type NewPostProps = {
  postMessage: string;
  onChangePostMessage: React.Dispatch<React.SetStateAction<string>>;
  status: RequestStatus;
  onSendPost: (text: string) => void;
  charsLimit: number;
};

const NewPost = ({
  postMessage,
  onChangePostMessage,
  status,
  onSendPost,
  charsLimit,
}: NewPostProps) => {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const charsLeft = charsLimit - postMessage.length;

  const isExtendedView = isInputFocused || postMessage;

  return (
    <NewPostContainer>
      <StyledIcon colorByText="Patricia Lebsack" />
      <MessageContainer>
        <StyledTextArea
          value={postMessage}
          onChange={({ target }) => onChangePostMessage(target.value)}
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
              onSendPost(postMessage);
            }}
            disabled={!postMessage.length}
            showError={status === RequestStatus.ERROR}
          >
            {status === RequestStatus.LOADING ? <StyledSpinner /> : "Send"}
          </StyledButton>
        </BottomAreaContainer>
      </MessageContainer>
    </NewPostContainer>
  );
};

export default NewPost;
