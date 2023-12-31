import { createContext, useContext } from "react";
import styled, { IStyledComponent, StyleSheetManager } from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

interface CommonRowProps {
  columns: string;
}

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props?.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

interface TableProps {
  columns: string;
  children: React.ReactNode;
}

interface TableChildrenProps {
  children: React.ReactNode;
}

interface TableBodyProps {
  data: any[];
  render: (data: any) => JSX.Element;
}

interface TableComponent extends React.FC<TableProps> {
  Header: React.FC<TableChildrenProps>;
  Row: React.FC<TableChildrenProps>;
  Body: React.FC<TableBodyProps>;
  Footer: IStyledComponent<
    "web",
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
  >;
}

interface TableContextType {
  columns: string;
}

const TableContext = createContext<TableContextType>({ columns: "" });

const Table: TableComponent = ({ columns, children }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
};

const Header: React.FC<TableChildrenProps> = ({ children }) => {
  const { columns } = useContext(TableContext);
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "columns"}>
      <StyledHeader role="row" columns={columns} as="header">
        {children}
      </StyledHeader>
    </StyleSheetManager>
  );
};

const Row: React.FC<TableChildrenProps> = ({ children }) => {
  const { columns } = useContext(TableContext);
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "columns"}>
      <StyledRow role="row" columns={columns}>
        {children}
      </StyledRow>
    </StyleSheetManager>
  );
};

const Body: React.FC<TableBodyProps> = ({ data, render }) => {
  if (!data.length) return <Empty>No data available!</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
};

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
