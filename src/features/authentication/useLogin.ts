import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login as loginApi } from "../../services/apiAuth";

interface LoginCredentialsType {
  email: string;
  password: string;
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isLoggingIn, mutate: login } = useMutation({
    mutationFn: ({ email, password }: LoginCredentialsType) =>
      loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoggingIn, login };
};
