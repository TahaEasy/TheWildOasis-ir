import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "همه" },
          { value: "checked-out", label: "تسویه شده" },
          { value: "checked-in", label: "پذیرش شده" },
          { value: "unconfirmed", label: "تایید نشده" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "بر اساس جدیدترین" },
          { value: "startDate-asc", label: "بر اساس قدیمی ترین" },
          {
            value: "totalPrice-desc",
            label: "بر اساس بیشترین مبلغ",
          },
          { value: "totalPrice-asc", label: "بر اساس کمترین مبلغ" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
