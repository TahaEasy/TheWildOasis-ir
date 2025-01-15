import { useSettings } from "../settings/useSettings";

const useBreakfastPrice = (breakfastType, numGuests, numNights) => {
  const {
    settings: {
      continentalBreakfastPrice,
      americanBreakfastPrice,
      englishBreakfastPrice,
    } = {},
    isLoading,
  } = useSettings();

  let breakfastPrice;
  if (breakfastType === "no-breakfast") breakfastPrice = 0;
  if (breakfastType === "continental")
    breakfastPrice = continentalBreakfastPrice;
  if (breakfastType === "american") breakfastPrice = americanBreakfastPrice;
  if (breakfastType === "english") breakfastPrice = englishBreakfastPrice;

  breakfastPrice = breakfastPrice * numNights * numGuests;

  let fBreakfastType;
  if (breakfastType === "continental") fBreakfastType = "کانتیننال";
  if (breakfastType === "american") fBreakfastType = "آمریکایی";
  if (breakfastType === "english") fBreakfastType = "انگلیسی";

  return {
    breakfastPrice,
    isLoading,
    // if you want...
    fBreakfastType,
    continentalBreakfastPrice,
    americanBreakfastPrice,
    englishBreakfastPrice,
  };
};

export default useBreakfastPrice;
