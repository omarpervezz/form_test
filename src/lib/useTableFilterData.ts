import { useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import { selectFilteredBookings } from "@/redux/feature/filter/filterSelector";
import { BookingDataType } from "@/types/api";

export const useTableFilterData = (data: BookingDataType[], entity: string) => {
  return useSelector((state: RootState) =>
    selectFilteredBookings(state, entity, data)
  );
};

export const getFilterOptions = <T extends keyof BookingDataType>(
  field: T,
  data: BookingDataType[]
) => {
  return Array.from(
    new Set(data.map((item) => item[field]?.toString()).filter(Boolean))
  );
};
