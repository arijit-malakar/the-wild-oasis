import styled, { css } from "styled-components";

interface RowProps {
  $type?: "horizontal" | "vertical";
}

const Row = styled.div<RowProps>`
  display: flex;

  ${({ $type = "vertical" }) =>
    $type === "horizontal"
      ? css`
          justify-content: space-between;
          align-items: center;
        `
      : css`
          flex-direction: column;
          gap: 1.6rem;
        `}
`;

export default Row;
