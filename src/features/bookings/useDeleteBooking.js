import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isPending: isDeletingBooking } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success("رزرو با موفقیت حذف شد!");
      queryClient.invalidateQueries();
    },
    onError: () => toast.error("مشکلی پیش آمد و رزرو حذف نشد!"),
  });

  return { deleteBooking, isDeletingBooking };
};

export default useDeleteBooking;
