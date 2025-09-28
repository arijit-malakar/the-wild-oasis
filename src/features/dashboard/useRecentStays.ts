import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysSinceDate } from "../../services/apiBookings";

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: stays, isPending } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysSinceDate(queryDate),
  });

  return { isPending, stays, numDays };
};
