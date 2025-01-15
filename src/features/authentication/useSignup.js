import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useSignup = () => {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationKey: ["user"],
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "حساب با موفقیت ساخته شد، لطفا حساب جدید را با ایمیل کاربر فعال کنید!"
      );
    },
  });

  return { signup, isLoading };
};
