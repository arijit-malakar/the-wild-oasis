import { useEffect, useRef } from "react";

export const useOutsideClick = <T extends HTMLElement>(
  handler: () => void,
  listenCapturing = true
): React.RefObject<T | null> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
};
