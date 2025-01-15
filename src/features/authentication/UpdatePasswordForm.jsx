import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";
import SpinnerMini from "../../ui/SpinnerMini";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="رمز عبور" error={errors?.password?.message}>
        <Input
          disabled={isUpdating}
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
          disabled={isUpdating}
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
        <Button onClick={reset} type="reset" variation="secondary">
          لغو
        </Button>
        <Button disabled={isUpdating}>
          {isUpdating ? <SpinnerMini /> : "بروزرسانی رمز"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
