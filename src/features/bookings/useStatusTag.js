const useStatusTag = (eStatus) => {
  let fStatus;
  if (eStatus === "unconfirmed") fStatus = "تایید-نشده";
  if (eStatus === "checked-in") fStatus = "پذیرش-شده";
  if (eStatus === "checked-out") fStatus = "تسویه-شده";

  const statusToTagName = {
    "تایید-نشده": "blue",
    "پذیرش-شده": "green",
    "تسویه-شده": "silver",
  };

  return [fStatus, statusToTagName];
};

export default useStatusTag;
