import { useSearchParams } from "react-router-dom";
import styled, { StyleSheetManager, css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

interface FilterButtonProps {
  active: boolean;
}

const FilterButton = styled.button<FilterButtonProps>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

interface FilterProps {
  filterField: string;
  options: {
    value: string;
    label: string;
  }[];
}

const Filter: React.FC<FilterProps> = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterValue = searchParams.get(filterField);

  const handleClick = (value: string) => {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) {
      searchParams.set("page", "1");
    }
    setSearchParams(searchParams);
  };

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "active"}>
      <StyledFilter>
        {options.map((option) => (
          <FilterButton
            key={option.value}
            onClick={() => handleClick(option.value)}
            active={filterValue === option.value}
            disabled={filterValue === option.value}
          >
            {option.label}
          </FilterButton>
        ))}
      </StyledFilter>
    </StyleSheetManager>
  );
};

export default Filter;
