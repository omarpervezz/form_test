"use client";
import React from "react";
import Table from "@/components/molecules/global/Table";
import Pagination from "@/components/molecules/global/Pagination";
import { ColumnConfig } from "@/components/molecules/global/Table";
import CardTitle from "@/components/atoms/CardTitle";
import { PackageTableFilterPropsTypes } from "@/types/component";

import TableLoader from "../global/Loader";

// Define the interface for our package data
export interface PackageData {
  id: number;
  title: string;
  location: string;
  duration: string;
  meals: string;
  mealsAction: string;
  flights: string;
  flightsAction: string;
  hotel: string;
  hotelAction: string;
  transport: string;
  transportAction: string;
  vendorName: string;
  price: string;
  status: string;
}

// Define the columns configuration with proper typing
export const columns: ColumnConfig[] = [
  {
    key: "title",
    type: "text",
    label: "Title",
  },
  {
    key: "location",
    type: "text",
    label: "Location",
  },
  {
    key: "duration",
    type: "text",
    label: "Duration",
  },
  {
    key: "meals",
    type: "button",
    label: "Meals",
    buttonProps: {
      labelKey: "mealsAction",
      onClick: (row: PackageData) => {
        if (row.meals !== "NA") {
          console.log("View meals for", row);
        }
      },
      className: "bg-[#1768D0] p-1 text-white disabled:bg-gray-300",
    },
  },
  {
    key: "flights",
    type: "button",
    label: "Flights",
    buttonProps: {
      labelKey: "flightsAction",
      onClick: (row: PackageData) => {
        if (row.flights !== "NA") {
          console.log("View flights for", row);
        }
      },
      className: "bg-[#1768D0] p-1 text-white disabled:bg-gray-300",
    },
  },
  {
    key: "hotel",
    type: "button",
    label: "Hotel",
    buttonProps: {
      labelKey: "hotelAction",
      onClick: (row: PackageData) => {
        if (row.hotel !== "NA") {
          console.log("View hotel for", row);
        }
      },
      className: "bg-[#1768D0] p-1 text-white disabled:bg-gray-300",
    },
  },
  {
    key: "transport",
    type: "button",
    label: "Transport",
    buttonProps: {
      labelKey: "transportAction",
      onClick: (row: PackageData) => {
        if (row.transport !== "NA") {
          console.log("View transport for", row);
        }
      },
      className: "bg-[#1768D0] p-1 text-white disabled:bg-gray-300",
    },
  },
  {
    key: "vendorName",
    type: "button",
    label: "Vendor",
    buttonProps: {
      labelKey: "vendorName",
      onClick: (row: PackageData) => {
        console.log("Vendor clicked:", row.vendorName);
      },
      className: "text-[#1768D0] hover:underline",
    },
  },
  {
    key: "price",
    type: "text",
    label: "Price",
  },
  {
    key: "status",
    type: "text",
    label: "Status",
  },
  {
    key: "action",
    type: "select",
    label: "Action",
    selectOptions: ["Edit", "Delete", "View Details", "Publish"],
    onSelectChange: (row: PackageData, value: string) => {
      console.log(`Action ${value} selected for row:`, row);
    },
  },
];

const PackageListTable: React.FC<PackageTableFilterPropsTypes> = ({
  data,
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-semibold text-xl text-[#243045] dark:text-white">
              Package List
            </CardTitle>
          </div>
        </div>
      </div>
      {isLoading ? (
        <TableLoader />
      ) : (
        <div className="mt-2">
          <Table data={data} columns={columns} />
          <div className="flex justify-end mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageListTable;
