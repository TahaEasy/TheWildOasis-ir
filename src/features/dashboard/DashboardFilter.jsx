import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: "7 روز قبل" },
        { value: "30", label: "30 روز قبل" },
        { value: "90", label: "90 روز قبل" },
      ]}
    />
  );
}

export default DashboardFilter;
