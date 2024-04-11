import styled from "styled-components";

export const TextAreaContainer = styled.textarea`
  resize: none;
  border: 0;
  font-family: ${({ theme }) => theme.font.family.slim};
  overflow: hidden;
  padding: 0;
  height: 28px;

  &:focus {
    outline: 0;
  }
`;

/* TextAreaContainer.defaultProps = { areaHeight: 28 }; */
