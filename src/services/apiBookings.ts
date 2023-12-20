// import { getToday } from "../utils/helpers";
import { PAGE_LIMIT } from "../utils/constants";

export const getBookings = async ({
  filter,
  sortBy,
  page,
}: {
  filter: {
    field: string;
    value: string;
  } | null;
  sortBy: string;
  page: number;
}) => {
  let queryStr = filter ? `?${filter.field}=${filter.value}` : "";
  queryStr = queryStr ? `${queryStr}&sort=${sortBy}` : `?sort=${sortBy}`;
  queryStr += `&page=${page}&limit=${PAGE_LIMIT}`;

  const res = await fetch(`/api/bookings${queryStr}`);

  if (!res.ok) {
    throw new Error("Unable to load bookings data");
  }

  const body = await res.json();
  const { data, results } = body;
  return { data, results };
};

export const getBooking = async (bookingId: string | undefined) => {
  const res = await fetch(`/api/bookings/${bookingId}`);

  if (!res.ok) {
    throw new Error("Unable to fetch booking details");
  }

  const body = await res.json();
  return body.data;
};

export const updateBooking = async (
  bookingId: string,
  newBooking: { status: "checked-in" | "checked-out"; isPaid?: boolean }
) => {
  const res = await fetch(`/api/bookings/${bookingId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBooking),
  });

  if (!res.ok) throw new Error("Booking could not be updated");

  const body = await res.json();
  return body.data;
};

export const deleteBooking = async (id: string) => {
  const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });

  if (!res.ok) {
    throw new Error("Booking could not be deleted");
  }
};

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// export async function getBookingsAfterDate(date) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("created_at, totalPrice, extrasPrice")
//     .gte("created_at", date)
//     .lte("created_at", getToday({ end: true }));

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }

//   return data;
// }

// Returns all STAYS that are were created after the given date
// export async function getStaysAfterDate(date) {
//   const { data, error } = await supabase
//     .from("bookings")
//     // .select('*')
//     .select("*, guests(fullName)")
//     .gte("startDate", date)
//     .lte("startDate", getToday());

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }

//   return data;
// }

// Activity means that there is a check in or a check out today
// export async function getStaysTodayActivity() {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("*, guests(fullName, nationality, countryFlag)")
//     .or(
//       `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
//     )
//     .order("created_at");

//   // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
//   // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
//   // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }
//   return data;
// }

// export async function deleteBooking(id) {
//   // REMEMBER RLS POLICIES
//   const { data, error } = await supabase.from("bookings").delete().eq("id", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be deleted");
//   }
//   return data;
// }
