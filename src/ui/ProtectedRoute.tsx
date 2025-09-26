import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  // 1. Get the authenticated user
  const { isPending, isAuthenticated } = useUser();

  // 2. If no authenticated user, redirect to login page
  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/login");
  }, [isAuthenticated, isPending, navigate]);

  // 3. While loading, display a spinner
  if (isPending)
    return (
      <FullPage>
        <Spinner />{" "}
      </FullPage>
    );

  // 4. If user exists, render children
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
