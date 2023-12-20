import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import BookingRow from "./BookingRow";
import Pagination from "../../ui/Pagination";
import { useBookings } from "./useBookings";
import { BookingType } from "./bookingTypes";

const BookingTable = () => {
  const { isLoading, bookings, records } = useBookings();

  if (isLoading) return <Spinner />;

  if (!bookings?.length) return <Empty resource="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings as BookingType[]}
          render={(booking: BookingType) => (
            <BookingRow key={booking._id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination records={records as number} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default BookingTable;
