import type { BookingType } from "../features/bookings/bookingType";
import supabase from "./supabase";
import { COUNT_PER_PAGE } from "../utils/constants";

type getBookingsArgs = {
  filter: {
    field: string;
    value: string;
  } | null;
  sortBy: {
    field: string;
    order: string;
  };
  page: number;
};

const getBookings = async ({
  filter,
  sortBy,
  page,
}: getBookingsArgs): Promise<{ data: BookingType[]; count: number | null }> => {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName, email)", { count: "exact" });

  // Filter
  if (filter) query = query.eq(filter.field, filter.value);

  // Sort
  if (sortBy)
    query = query.order(sortBy.field, { ascending: sortBy.order === "asc" });

  // Filter
  if (page) {
    const from = (page - 1) * COUNT_PER_PAGE;
    const to = from + COUNT_PER_PAGE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
};

const getBooking = async (id: BookingType["id"]): Promise<BookingType> => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
};

const updateBooking = async (
  id: BookingType["id"],
  obj: Partial<BookingType>
): Promise<BookingType> => {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
};

const deleteBooking = async (id: BookingType["id"]) => {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
};

export { getBookings, getBooking, updateBooking, deleteBooking };
