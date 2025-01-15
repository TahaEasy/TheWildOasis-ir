import { useState } from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";
import Select from "../../ui/Select";

function UpdateSettingsForm() {
  const [breakfastType, setBreakfastType] = useState("continental");
  const { isLoading, settings } = useSettings();

  const options = [
    { value: "continental", label: "صبحانه کانتیننتال" },
    { value: "american", label: "صبحانه آمریکایی" },
    { value: "english", label: "صبحانه انگلیسی" },
  ];

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    continentalBreakfastPrice,
    americanBreakfastPrice,
    englishBreakfastPrice,
  } = settings || {};

  const { updateSetting, isUpdating } = useUpdateSetting();

  const handleUpdate = (e, field) => {
    const { value } = e.target;

    if (!value) return;
    if (settings[field] === Number(value)) return;

    updateSetting({ [field]: value });
  };

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="حداقل تعداد شب برای هر رزور">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="حداکثر تعداد شب برای هر رزور">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="حداکثر تعداد مهمان برای هر رزور">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="نوع صبحانه">
        <Select
          options={options}
          value={breakfastType}
          onChange={(e) => setBreakfastType(e.target.value)}
          type="white"
        />
      </FormRow>
      {breakfastType === "continental" && (
        <FormRow label="قیمت صبحانه">
          <Input
            type="number"
            step={50000}
            min={50000}
            id="breakfast-price"
            defaultValue={continentalBreakfastPrice}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "continentalBreakfastPrice")}
          />
        </FormRow>
      )}
      {breakfastType === "american" && (
        <FormRow label="قیمت صبحانه">
          <Input
            type="number"
            step={50000}
            min={50000}
            id="breakfast-price"
            defaultValue={americanBreakfastPrice}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "americanBreakfastPrice")}
          />
        </FormRow>
      )}
      {breakfastType === "english" && (
        <FormRow label="قیمت صبحانه">
          <Input
            type="number"
            step={50000}
            min={50000}
            id="breakfast-price"
            defaultValue={englishBreakfastPrice}
            disabled={isUpdating}
            onBlur={(e) => handleUpdate(e, "englishBreakfastPrice")}
          />
        </FormRow>
      )}
    </Form>
  );
}

export default UpdateSettingsForm;
