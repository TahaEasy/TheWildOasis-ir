import styled from "styled-components";
import { isToday } from "date-fns";
import { format } from "date-fns-jalali";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import useBreakfastPrice from "../check-in-out/useBreakfastPrice";
import { useDarkMode } from "../../context/DarkModeContext";

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: ${(props) =>
    props.darkBg ? "var(--color-grey-100);" : "var(--color-brand-500);"};
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

// A purely presentational component
function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    breakfastType,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  const { fBreakfastType } = useBreakfastPrice(
    breakfastType,
    numGuests,
    numNights
  );
  const { isDarkMode } = useDarkMode();

  return (
    <StyledBookingDataBox>
      <Header darkBg={isDarkMode}>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} شب در اتاق <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, dd MMMM yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, dd MMMM yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && (
            <Flag src={countryFlag} alt={`پرچم کشور ${country}`} />
          )}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} مهمان` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>کدملی: {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="توضیحات:"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="درخواست صبحانه؟">
          {hasBreakfast ? "بله" : "خیر"}
        </DataItem>
        {hasBreakfast && (
          <DataItem icon={<HiOutlineCheckCircle />} label="نوع صبحانه؟">
            {fBreakfastType}
          </DataItem>
        )}

        <Price isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`کل مبلغ`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} اتاق + ${formatCurrency(
                extrasPrice
              )} صبحانه)`}
          </DataItem>

          <p>{isPaid ? "پرداخت شده" : "حضوری پرداخت خواهد شد"}</p>
        </Price>
      </Section>

      <Footer>
        <p>
          رزرو در تاریخ {format(new Date(created_at), "EEE, dd MMMM yyyy, p")}
        </p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
