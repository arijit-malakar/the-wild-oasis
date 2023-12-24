import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "../../services/apiAuth";
import { UserType } from "./userTypes";

export const useUser = () => {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery<UserType>({
    queryKey: ["user"],
    queryFn: getLoggedInUser,
    retry: false,
  });

  return { isLoading, user, error };
};
