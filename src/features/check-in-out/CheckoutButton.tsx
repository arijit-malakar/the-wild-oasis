import type { BookingType } from "../bookings/bookingType";
import { useCheckout } from "./useCheckout";
import Button from "../../ui/Button";

interface CheckoutButtonProps {
  bookingId: BookingType["id"];
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ bookingId }) => {
  const { isCheckingOut, checkout } = useCheckout();

  return (
    <Button
      $variation="primary"
      $size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
};

export default CheckoutButton;
