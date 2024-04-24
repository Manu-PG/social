import styled from "styled-components";
import CompactPost from "../../../../components/CompactPost";

export const StyledCompactPost = styled(CompactPost)`
  padding: 1rem 1rem 1.2rem 1rem;
  background-color: ${({ theme }) => theme.color.background.main};
  transition: transform 0.3s, box-shadow 0.3s, outline 0.3s;
  outline: 1px solid ${({ theme }) => theme.color.primary.main};

  &:hover {
    transform: scale(1.02);
    border-radius: 5px;
    box-shadow: 0 0 1rem 0.1rem ${({ theme }) => theme.color.secondary.transparent};
    z-index: 100;
    outline: 1px solid ${({ theme }) => theme.color.secondary.main};
  }
`;

export const CenterElementContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;
