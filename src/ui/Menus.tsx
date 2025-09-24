import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

import { useOutsideClick } from "../hooks/useOutsideClick";

interface Position {
  x: number;
  y: number;
}

interface StyledListProps {
  $position: Position;
}

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface ToggleProps {
  id: string;
}

interface ListProps extends React.PropsWithChildren {
  id: string;
}

interface ButtonProps extends React.PropsWithChildren {
  icon: React.ReactNode;
  onClick?: () => void;
}

interface MenusComposition {
  Menu: typeof Menu;
  Toggle: React.FC<ToggleProps>;
  List: React.FC<ListProps>;
  Button: React.FC<ButtonProps>;
}

interface MenusContextType {
  openId: string;
  close: () => void;
  open: React.Dispatch<React.SetStateAction<string>>;
  position: Position | null;
  setPosition: React.Dispatch<React.SetStateAction<Position | null>>;
}

const MenusContext = createContext<MenusContextType>({
  openId: "",
  close: () => {},
  open: () => {},
  position: null,
  setPosition: () => {},
});

const Menus: React.FC<React.PropsWithChildren> & MenusComposition = ({
  children,
}) => {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState<Position | null>(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

const Toggle: React.FC<ToggleProps> = ({ id }) => {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const rect = (e.target as HTMLElement)
      .closest("button")
      ?.getBoundingClientRect();
    if (rect)
      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8,
      });

    return openId === "" || openId !== id ? open(id) : close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List: React.FC<ListProps> = ({ id, children }) => {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick<HTMLUListElement>(close);

  if (openId !== id) return null;

  return createPortal(
    <StyledList $position={position ?? { x: 0, y: 0 }} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
};

const Button: React.FC<ButtonProps> = ({ children, icon, onClick }) => {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
