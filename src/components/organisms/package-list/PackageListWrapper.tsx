"use client";
import PackageListTable from "@/components/molecules/package-list/PackageListTable";
import { useGetTablesQuery } from "@/redux/feature/api/table/tableSlice";
import { RootState } from "@/redux/redux-store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPackagePage } from "@/redux/feature/package-list/packageListSlice";

function PackageListWrapper() {
  const dispatch = useDispatch();
  // redux state
  const currentPage = useSelector(
    (state: RootState) => state.bookingFlight.currentPage
  );
  const limit = 12;
  const endpoint = "/api/v1/package-list/";

  // ✅ Use RTK Query Hook and Provide Default Value
  const { data: packageList = { data: [], totalPages: 1 }, isLoading } =
    useGetTablesQuery({
      endpoint,
      page: currentPage,
      limit,
    });

  // ✅ Extract totalPages safely
  const totalPages = packageList?.totalPages ?? 1;

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPackagePage(page));
  };
  return (
    <div className="p-5 rounded-md bg-white dark:bg-darkPrimaryBg">
      <PackageListTable
        data={packageList?.data || []}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  );
}

export default PackageListWrapper;
