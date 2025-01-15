import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns-jalali";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const Span = styled.span`
  font-weight: 100;
  font-size: 1.75rem;
  margin: 0 0.75rem;
`;

const SalesChart = ({ bookings, numDays }) => {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "dd MMMM"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#16a34a", fill: "#65A30D" },
        extrasSales: { stroke: "#dcfce7", fill: "#4d7d0a" },
        text: "#c6c7c9",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#65A30D", fill: "#c9e6a1" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };
  return (
    <StyledSalesChart>
      <Heading as="h2">
        <Span>فروش از</Span> {format(allDates.at(0), "dd MMMM yyyy")}{" "}
        <Span>تا</Span> {format(allDates.at(-1), "dd MMMM yyyy")}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text, fontSize: "1.5rem" }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit=" ت"
            tick={{
              fill: colors.text,
              fontSize: "1rem",
              direction: "ltr",
            }}
            tickLine={{ stroke: colors.text }}
            orientation="right"
            tickFormatter={(tick) => tick.toLocaleString()}
            width={65}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
              direction: "rtl",
            }}
            formatter={(tick) => tick.toLocaleString()}
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="فروش کلی"
            unit=" تومان"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="فروش اضافی"
            unit=" تومان"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
};

export default SalesChart;
