import type { CabinType } from "../cabins/cabinType";

export interface BookingType {
  id: number;
  created_at: Date;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabins: { name: CabinType["name"] };
  guests: {
    fullName: string;
    email: string;
    nationality: string;
    nationalID: string;
    countryFlag: string;
  };
}
