import Button from "../../ui/Button";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      variation="primary"
      size="sm"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      تسویه
    </Button>
  );
}

export default CheckoutButton;
