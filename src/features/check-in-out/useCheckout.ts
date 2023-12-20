import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const { isPending: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (bookingId: string) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data._id} successfully checked out`);
      queryClient.invalidateQueries();
    },

    onError: () => toast.error("There was an error while checking out"),
  });

  return { isCheckingOut, checkout };
};
