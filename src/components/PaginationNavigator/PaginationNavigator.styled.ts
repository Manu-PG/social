import styled from "styled-components";
import Button from "../Button";
import Input from "../Input";

export const PaginationNavigatorContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 0.5em;
`;

export const StyledButton = styled(Button)`
  background-color: #202327;
  border: 1px solid #202327;

  &:active {
    background-color: #3d454e;
  }

  &:hover {
    border: 1px solid #1d9bf0;
  }

  &:disabled {
    &:hover {
      background-color: #202327;
      border: 1px solid #202327;
    }
  }

  * {
    padding: 3px;
  }

  span {
    width: 20px;
  }
`;

export const StyledInput = styled(Input)`
  width: 2em;

  input {
    text-align: center;
  }
`;
