import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface StyledModalProps {
  ref: React.RefObject<HTMLDivElement>;
}

const StyledModal = styled.div<StyledModalProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

interface ModalContextType {
  windowToOpen: string;
  setWindowToOpen: React.Dispatch<React.SetStateAction<string>>;
}

const ModalContext = createContext<ModalContextType>({
  windowToOpen: "",
  setWindowToOpen: () => {},
});

interface ModalProps {
  children: React.ReactNode;
}

interface OpenProps {
  children: React.ReactElement;
  opens: string;
}

interface WindowProps {
  children: React.ReactElement;
  name: string;
}

interface ModalComponent extends React.FC<ModalProps> {
  Open: React.FC<OpenProps>;
  Window: React.FC<WindowProps>;
}

const Modal: ModalComponent = ({ children }) => {
  const [windowToOpen, setWindowToOpen] = useState("");
  const value = {
    windowToOpen,
    setWindowToOpen,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

const Open: React.FC<OpenProps> = ({ children, opens }) => {
  const { setWindowToOpen } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => setWindowToOpen(opens),
  });
};

const Window: React.FC<WindowProps> = ({ children, name }) => {
  const { windowToOpen, setWindowToOpen } = useContext(ModalContext);
  const ref = useOutsideClick(setWindowToOpen);

  if (windowToOpen !== name) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={() => setWindowToOpen("")}>
          <HiXMark />
        </Button>
        <div>
          {cloneElement(children, {
            onCloseModal: setWindowToOpen,
          })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
