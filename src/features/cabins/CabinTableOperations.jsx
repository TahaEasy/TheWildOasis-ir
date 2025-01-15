import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "همه" },
          { value: "no-discount", label: "بدون تخفیف" },
          { value: "with-discount", label: "با تخفیف" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "بر اساس اسم (الف تا ی)" },
          { value: "name-desc", label: "بر اساس اسم (ی تا الف)" },
          { value: "regularPrice-asc", label: "بر اساس قیمت (ارزان ترین)" },
          {
            value: "regularPrice-desc",
            label: "بر اساس قیمت (گران ترین)",
          },
          { value: "maxCapacity-asc", label: "بر اساس ظرفیت (کمترین)" },
          {
            value: "maxCapacity-desc",
            label: "بر اساس ظرفیت (بیشترین)",
          },
          {
            value: "updated_at-asc",
            label: "بر اساس آخرین تغییر",
          },
          {
            value: "created_at-asc",
            label: "بر اساس جدیدترین",
          },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
