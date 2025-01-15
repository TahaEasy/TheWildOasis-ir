import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { FileInput, FileInputLabel } from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import { useState } from "react";
import SpinnerMini from "../../ui/SpinnerMini";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const [imageName, setImageName] = useState("عکسی انتخاب نشده");

  const { register, handleSubmit, reset, formState /* getValues */ } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const imageField = register("image", {
    required: isEditSession ? false : "این کادر الزامی است!",
  });

  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const isWorking = isCreating || isEditing;

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  };

  const onError = (errors) => {
    console.log(errors);
  };

  const handleChange = (e) => {
    setImageName(e.target.files[0].name);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="نام اتاق" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "این کادر الزامی است!" })}
        />
      </FormRow>

      <FormRow label="حداکثر ظرفیت" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "این کادر الزامی است!",
            min: {
              value: 1,
              message: "حداقل ظرفیت 1 نفر است!",
            },
          })}
        />
      </FormRow>

      <FormRow label="قیمت" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          step={50000}
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "این کادر الزامی است!",
            min: {
              value: 100000,
              message: "قیمت باید حداقل 100،000 تومان باشد",
            },
          })}
        />
      </FormRow>

      <FormRow label="درصد تخفیف" error={errors?.discount?.message}>
        <Input
          type="number"
          step={5}
          min={0}
          max={100}
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "این کادر الزامی است!",
            min: {
              value: 0,
              message: "درصد تخفیف نباید کمتر از 0 باشد!",
            },
            max: {
              value: 100,
              message: "درصد تخفیف نباید بیشتر از 100 باشد!",
            },
            // 👇 this one if discount is not with percentage
            // validate: (value) =>
            //   value <= getValues().regularPrice ||
            //   "The discount must be less than regular price!",
          })}
        />
      </FormRow>

      <FormRow label="توضیحات" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "این کادر الزامی است!" })}
        />
      </FormRow>

      <FormRow
        wantLabel={false}
        label="عکس اتاق"
        error={errors?.image?.message}
      >
        <FileInput
          id="image"
          disabled={isWorking}
          accept="image/*"
          {...imageField}
          onChange={(e) => {
            imageField.onChange(e);
            handleChange(e);
          }}
        />
        <div>
          <FileInputLabel htmlFor="image">انتخاب عکس</FileInputLabel>
          <span>{imageName}</span>
        </div>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          لغو
        </Button>
        <Button disabled={isWorking}>
          {isWorking ? (
            <SpinnerMini />
          ) : isEditSession ? (
            "بروزرسانی"
          ) : (
            "ساخت اتاق جدید"
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
