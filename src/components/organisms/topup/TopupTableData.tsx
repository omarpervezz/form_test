"use client";
import React from "react";
import Table from "@/components/molecules/global/Table";
import TableSearch from "@/components/molecules/global/TableSearch";
import SelectFilter from "@/components/molecules/global/SelectTableFilter";
import Pagination from "@/components/molecules/global/Pagination";
import { ColumnConfig } from "@/components/molecules/global/Table";
import DatePicker from "@/components/molecules/global/DatePicker";
import { TableFilterPropsTypes } from "@/types/component";
import { BookingDataType } from "@/hooks/api/v1/useFetchData";
import { Button } from "@/components/atoms/Button";
import TableLoader from "@/components/molecules/global/Loader";
import { getFilterOptions, useTableFilterData } from "@/lib/useTableFilterData";

export const columns: ColumnConfig[] = [
  { key: "accountName", type: "text", label: "Account Name" },
  { key: "accountNumber", type: "text", label: "Account Number" },
  { key: "paymentDate", type: "text", label: "Payment Date" },
  { key: "paymentType", type: "text", label: "Payment Type" },
  { key: "accountType", type: "text", label: "Account Type" },
  { key: "amount", type: "text", label: "Amount" },
  { key: "transactionNumber", type: "text", label: "Transaction Number" },

  { key: "status", type: "text", label: "Status" },
  {
    key: "action",
    type: "select",
    label: "Action",
    selectOptions: ["Confirm", "Pending", "Delete", "Draft"],
    onSelectChange: () => {},
  },
];

const TopupTableData: React.FC<TableFilterPropsTypes> = ({
  data,
  currentPage,
  totalPages,
  onPageChange,
  actionButton,
  isLoading,
}) => {
  const filteredTableData = useTableFilterData(data, "topup");
  return (
    <div>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <div className="flex flex-col sm:flex-row sm:justify-start sm:items-center gap-2 sm:space-y-0 space-y-2 sm:px-0 px-2">
          <TableSearch entity="topup" />
          <div className="flex gap-2 items-center">
            <DatePicker
              field="issueDate"
              className="flex-1 sm:flex-auto"
              entity="topup"
            />
            {["status"].map((field: string) => (
              <SelectFilter
                entity="topup"
                key={field}
                searchField={field as keyof BookingDataType}
                getOptions={() =>
                  getFilterOptions(field as keyof BookingDataType, data)
                }
                className="flex-1 sm:flex-auto"
              />
            ))}
          </div>
        </div>
        <div className="sm:flex hidden items-start lg:items-center justify-start overflow-x-auto no-scrollbar lg:justify-end gap-4">
          {actionButton?.map((button, index) => (
            <Button
              key={index}
              onClick={button.onClick}
              className={`flex gap-1 px-4 py-1.5 rounded-md text-white text-sm font-bold transition-all duration-150 ${button.className}`}
            >
              {button.icon}
              {button.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {isLoading ? (
          <TableLoader />
        ) : (
          <div className="overflow-x-auto mt-5 ">
            <Table data={filteredTableData} columns={columns} />
            <div className="flex justify-end">
              {filteredTableData.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopupTableData;
