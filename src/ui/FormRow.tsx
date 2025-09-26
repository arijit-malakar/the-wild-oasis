import styled, { css } from "styled-components";

interface StyledFormRowProps {
  $type?: "vertical";
}

const StyledFormRow = styled.div<StyledFormRowProps>`
  padding: 1.2rem 0;

  ${(props) =>
    props.$type === "vertical"
      ? css`
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        `
      : css`
          display: grid;
          align-items: center;
          grid-template-columns: 24rem 1fr 1.2fr;
          gap: 2.4rem;

          &:first-child {
            padding-top: 0;
          }

          &:last-child {
            padding-bottom: 0;
          }

          &:not(:last-child) {
            border-bottom: 1px solid var(--color-grey-100);
          }

          &:has(button) {
            display: flex;
            justify-content: flex-end;
            gap: 1.2rem;
          }
        `}
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

interface FormRowProps extends StyledFormRowProps {
  label?: string;
  error?: string;
  children: React.ReactElement<{ id: string }>;
}

const FormRow: React.FC<FormRowProps> = ({ label, error, children, $type }) => {
  return (
    <StyledFormRow $type={$type}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
};

export default FormRow;
