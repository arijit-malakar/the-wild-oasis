import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";

export const useSignup = () => {
  const { isPending: isSigningUp, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("Account successfully created");
    },
  });

  return { isSigningUp, signup };
};
