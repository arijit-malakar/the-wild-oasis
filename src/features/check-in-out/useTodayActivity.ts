import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";
import { BookingType } from "../bookings/bookingTypes";

export const useTodayActivity = () => {
  const { isLoading, data: activities } = useQuery<BookingType[]>({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });

  return { isLoading, activities };
};
