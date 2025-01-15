import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

const useCheckout = () => {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationKey: ["checkin"],
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`رزرو #${data.id} با موفقیت تسویه شد!`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("مشکلی پیش آمد و رزرو تسویه نشد!");
    },
  });

  return { checkout, isCheckingOut };
};

export default useCheckout;
