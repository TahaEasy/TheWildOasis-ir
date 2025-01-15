import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import useBreakfastPrice from "./useBreakfastPrice";
import Select from "../../ui/Select";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [breakfastTypeState, setBreakfastTypeState] = useState("continental");

  const { booking = {}, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();

  const moveBack = useMoveBack();

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const { breakfastPrice, isLoading: isLoadingSettings } = useBreakfastPrice(
    breakfastTypeState,
    numGuests,
    numNights
  );

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking.isPaid]);

  const handleCheckin = () => {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: breakfastPrice,
          totalPrice: totalPrice + breakfastPrice,
        },
      });
    } else {
      checkin({ bookingId });
    }
  };

  if (isLoading || isLoadingSettings) return <Spinner />;

  const options = [
    { value: "continental", label: "صبحانه کانتیننتال" },
    { value: "american", label: "صبحانه آمریکایی" },
    { value: "english", label: "صبحانه انگلیسی" },
  ];

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">پذیرش رزرو #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>بازگشت &larr;</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Select
            options={options}
            value={breakfastTypeState}
            onChange={(e) => setBreakfastTypeState(e.target.value)}
            type="white"
            style={{ marginBottom: "1rem" }}
          />
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            درخواست صبحانه به قیمت {formatCurrency(breakfastPrice)}؟
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((paid) => !paid)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          من تایید میکنم که <strong>"{guests.fullName}"</strong> کل مبلغ{" "}
          <strong>
            {' "'}
            {!addBreakfast
              ? formatCurrency(totalPrice)
              : formatCurrency(totalPrice + breakfastPrice)}
            "
          </strong>
          را پرداخت کرده است.
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          پذیرش رزرو #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          بازگشت
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
