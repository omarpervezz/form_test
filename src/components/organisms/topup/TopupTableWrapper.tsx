"use client";
import { useRef } from "react";

import { IoPrintOutline } from "react-icons/io5";
import { RiFilter2Line } from "react-icons/ri";
import { LuDownload } from "react-icons/lu";
import Print from "@/components/molecules/global/Print";
import Export from "@/components/molecules/global/Export";
import { columns as TopupColumns } from "./TopupTableData";
import TopupTableData from "./TopupTableData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import {
  setCurrentTopupPage,
  setPrintData,
  setShowPrint,
} from "@/redux/feature/topup/topupSlice";
import { useGetTablesQuery } from "@/redux/feature/api/table/tableSlice";

const columnMap: Record<number, { key: string; label: string }[]> = {
  0: TopupColumns,
};

const TopupTableWraper = () => {
  const dispath = useDispatch();
  const currentPageTopup = useSelector(
    (state: RootState) => state.topup.currentPage
  );
  const printData = useSelector((state: RootState) => state.topup.printData);
  const showPrint = useSelector((state: RootState) => state.topup.showPrint);

  const exportRef = useRef<{ handleExport: () => void } | null>(null);
  const limit = 12;
  const endpoint = "/api/v1/topup";

  // Use RTK Query Hook and Provide Default Value
  const { data: packageRefund = { data: [], totalPages: 1 }, isLoading } =
    useGetTablesQuery({
      endpoint,
      page: currentPageTopup,
      limit,
    });

  // Extract totalPages safely
  const totalPages = packageRefund?.totalPages ?? 1; // Default to 1 if undefined

  const handlePageChange = (page: number) => {
    dispath(setCurrentTopupPage(page));
  };

  const handlePrint = () => {
    dispath(setPrintData(packageRefund?.data || [])); // Ensure printData is always an array
    dispath(setShowPrint(true));
  };

  const handleExport = () => {
    if (exportRef.current) {
      exportRef.current.handleExport();
    }
  };

  const buttons = [
    {
      label: <span className="hidden sm:block">Filter</span>,
      onClick: () => console.log("Filter clicked"),
      icon: <RiFilter2Line size={20} />,
      className: "bg-[#FCAA22] hover:bg-[#ffb53d]",
    },
    {
      label: <span className="hidden sm:block">Export</span>,
      onClick: handleExport,
      icon: <LuDownload size={20} />,
      className: "bg-[#20B038] hover:bg-[#257a33]",
    },
    {
      label: <span className="hidden sm:block">Print</span>,
      onClick: handlePrint,
      icon: <IoPrintOutline size={20} />,
      className: "bg-[#1768D0] hover:bg-[#2e77d7]",
    },
  ];

  return (
    <div className="p-1 sm:p-5 rounded-md bg-white dark:bg-darkPrimaryBg">
      <div>
        <TopupTableData
          data={packageRefund?.data || []}
          currentPage={currentPageTopup}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          actionButton={buttons}
          isLoading={isLoading}
        />
      </div>
      <Export
        ref={exportRef}
        columns={columnMap[0] || []}
        data={packageRefund?.data || []}
        onExportComplete={() => console.log("Export completed!")}
      />
      {showPrint && (
        <Print
          title={"Booking Table Data"}
          data={printData}
          columns={columnMap[0]}
          onClose={() => setShowPrint(false)}
        />
      )}
    </div>
  );
};

export default TopupTableWraper;
