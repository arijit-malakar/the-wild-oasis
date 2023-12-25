import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserPassword } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();

  const { isPending: isUpdatingPassword, mutate: updatePassword } = useMutation(
    {
      mutationFn: updateUserPassword,
      onSuccess: () => {
        toast.success("User password updated successfully.");
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return { isUpdatingPassword, updatePassword };
};
