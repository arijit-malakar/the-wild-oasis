import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

const CheckoutButton: React.FC<{ bookingId: string }> = ({ bookingId }) => {
  const { isCheckingOut, checkout } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
};

export default CheckoutButton;
