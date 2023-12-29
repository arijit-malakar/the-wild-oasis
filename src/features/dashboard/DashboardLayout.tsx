import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { BookingType } from "../bookings/bookingTypes";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { isLoadingBookings, bookings } = useRecentBookings();
  const { isLoadingStays, confirmedStays, numDays } = useRecentStays();
  const { isLoading: isLoadingCabins, cabins } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings as BookingType[]}
        confirmedStays={confirmedStays as BookingType[]}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <Today />
      <DurationChart confirmedStays={confirmedStays as BookingType[]} />
      <SalesChart bookings={bookings as BookingType[]} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
