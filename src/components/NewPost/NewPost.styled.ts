import styled from "styled-components";
import ProfileIcon from "../ProfileIcon";
import Button from "../Button";
import TextArea from "../TextArea";
import SpinerSVG from "../svg/SpinnerSVG";
import { getCountColor } from "./NewPost.utils";

export const NewPostContainer = styled.label`
  display: flex;
  gap: 0.7em;
  padding: 0.8em 1em;
`;

export const MessageContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-flow: column;
  justify-content: baseline;
  gap: 0.3em;
`;

export const StyledIcon = styled(ProfileIcon)`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
`;

export const StyledTextArea = styled(TextArea)`
  font-size: 22px;
  font-weight: 300;
  line-height: 26px;
  margin: 0.2em 0 0 0;
`;

export const HorizontalDividerBar = styled.hr`
  width: 100%;
  border: 0;
  border-top: 1px solid #2f3336;
`;

export const VerticalDividerBar = styled.hr`
  height: 100%;
  margin: 0;
  border: 0;
  border-left: 1px solid #2f3336;
`;

export const BottomAreaContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 1em;
`;

type LimitCounterProps = {
  $charsCount?: number;
};

export const LimitCounter = styled.span<LimitCounterProps>`
  color: ${({ $charsCount }) => getCountColor($charsCount)};
  transition: 0.5s all;
`;

export const StyledSpinner = styled(SpinerSVG)`
  width: 20px;
  height: 20px;
  fill: white;
`;

type StyledButtonProps = {
  showError?: boolean;
};

export const StyledButton = styled(Button)<StyledButtonProps>`
  align-self: end;
  background-color: ${({ showError }) => (showError ? "#c20d0d" : "#1d9bf0")};
  font-weight: 700;
  padding: 0.5em 1em;

  &:hover {
    background-color: ${({ showError }) => (showError ? "#8f0e0e" : "#1984cc")};
  }

  &:disabled,
  &:disabled:hover {
    background-color: ${({ showError }) => (showError ? "#590d0d" : "#125988")};
  }
`;
