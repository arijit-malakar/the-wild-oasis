import { differenceInDays, formatDistance, parseISO } from "date-fns";

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);

export const formatDistanceFromNow = (dateStr: Date | string) =>
  formatDistance(parseISO(String(dateStr)), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options?: { end: boolean }) {
  const today = new Date();

  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const subtractDates = (
  dateStr1: Date | string,
  dateStr2: Date | string
) => differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));
