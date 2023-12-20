import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

interface MutationFnArgs {
  bookingId: string;
  breakfast:
    | {
        hasBreakfast: boolean;
        extrasPrice: number;
        totalPrice: number;
      }
    | {};
}

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isCheckingIn, mutate: checkin } = useMutation({
    mutationFn: ({ bookingId, breakfast }: MutationFnArgs) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data._id} successfully checked in`);
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      navigate("/");
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { isCheckingIn, checkin };
};
