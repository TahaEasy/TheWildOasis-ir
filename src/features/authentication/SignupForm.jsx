import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

function SignupForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const { signup, isLoading } = useSignup();

  const onSubmit = ({ fullName, email, password }) => {
    signup(
      { fullName, email, password },
      {
        onSuccess: () => reset(),
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="نام و نام خانوادگی" error={errors?.fullName?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="fullName"
          {...register("fullName", { required: "این کادر الزامی است!" })}
        />
      </FormRow>

      <FormRow label="آدرس ایمیل" error={errors?.email?.message}>
        <Input
          disabled={isLoading}
          type="email"
          id="email"
          {...register("email", {
            required: "این کادر الزامی است!",
            pattern: { value: /\S+@\S+\.\S+/, message: "ایمیل نامعتبر است!" },
          })}
        />
      </FormRow>

      <FormRow label="رمز عبور" error={errors?.password?.message}>
        <Input
          disabled={isLoading}
          type="password"
          id="password"
          {...register("password", {
            required: "این کادر الزامی است!",
            minLength: {
              value: 8,
              message: "رمز عبور باید حداقل 8 کاراکتر داشته باشد!",
            },
          })}
        />
      </FormRow>

      <FormRow label="تکرار رمز عبور" error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isLoading}
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "این کادر الزامی است!",
            validate: (value, formValues) =>
              value === formValues.password || "رمز عبور ها یکسان نیستند!",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={reset}
          disabled={isLoading}
        >
          لغو
        </Button>
        <Button disabled={isLoading}>ساخت کاربر جدید</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
