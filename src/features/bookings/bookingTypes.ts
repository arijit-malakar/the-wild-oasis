export interface BookingType {
  _id: string;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabin: {
    name: string;
  };
  guest: {
    fullName: string;
    email: string;
    nationality: string;
    nationalID: string;
    countryFlag: string;
  };
  createdAt: Date;
}
