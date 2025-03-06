/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import ReusableButton from "@/components/molecules/global/ReusableButton";
import Image from "next/image";
import Swal from "sweetalert2";

type CellType = "button" | "text" | "checkbox" | "image" | "select" | "custom";

export interface ColumnConfig {
  key: string;
  type: CellType;
  label: string;
  buttonProps?: {
    labelKey: string;
    onClick: (row: any) => void;
    className: string;
  };
  selectOptions?: string[];
  onSelectChange?: (row: any, value: string) => void;
}

interface ReusableTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  columns: ColumnConfig[];
}

const Table: React.FC<ReusableTableProps> = ({ data, columns }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<null | string>(null);

  const handleClickOutside = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;
    if (!target.closest(".dropdown-container")) {
      setIsDropdownOpen(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "booked":
        return "text-[#20B038]";
      case "hold":
        return "text-yellow-400";
      case "cancelled":
        return "text-red-700";
      default:
        return "text-gray-700";
    }
  };
  const getUserRolerColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "text-[#00BAD1] font-bold"; // 🔴 Red for Admin
      case "hr":
        return "text-[#7367F0] font-bold"; // 🔵 Blue for Editor
      case "executive":
        return "text-[#FF9F43] font-bold"; // 🟢 Green for Moderator
      default:
        return "text-gray-700"; // Default Gray
    }
  };
  return (
    <div className="no-scrollbar">
      <table className="min-w-full  overflow-x-auto border-collapse border  dark:bg-darkPrimaryBg ">
        <thead>
          <tr className="bg-[#D8ECFD]">
            {columns.map((column) => (
              <th
                key={column.key}
                className="p-4 text-start text-sm font-medium text-[#1768D0] dark:text-gray-400 dark:bg-[#2E3C4F] "
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={`row-${row.id || rowIndex}`} className="">
              {columns.map((column) => (
                <td
                  key={`row-${row.id || rowIndex}-col-${column.key}`}
                  className={`border-b dark:border-gray-700 px-4 py-2 font-normal text-xs dark:bg-[#1E293B] dark:text-gray-300 
               ${
                 column.key === "status" && row[column.key]
                   ? getStatusColor(row[column.key]) // ✅ Apply status color
                   : column.key === "userRoler" && row[column.key]
                   ? getUserRolerColor(row[column.key]) // ✅ Apply role color
                   : "text-[#243045]" // Default text color
               }
             `}
                >
                  {column.type === "text" && <span>{row[column.key]}</span>}
                  {column.type === "button" && column.buttonProps && (
                    <div>
                      <ReusableButton
                        label={row[column.buttonProps.labelKey]}
                        onClick={() => column.buttonProps?.onClick(row)}
                        className={column.buttonProps.className}
                      />
                    </div>
                  )}
                  {column.type === "checkbox" && (
                    <input type="checkbox" checked={row[column.key]} readOnly />
                  )}

                  {column.type === "custom" &&
                    Array.isArray(row[column.key]) &&
                    (
                      row[column.key] as {
                        image: string;
                        title: string;
                        description: string;
                      }[]
                    ).map(
                      (
                        item: {
                          image: string;
                          title: string;
                          description: string;
                        },
                        index: number
                      ) => (
                        <div key={index} className="flex items-center gap-2">
                          {/* Ensure item.image exists before rendering */}
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.title || "Product Image"}
                              width={50}
                              height={50}
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                          <div>
                            <p className="text-sm font-semibold text-[#243045] dark:text-gray-300">
                              {item.title || "No Title"}
                            </p>
                            <p className="text-xs font-normal text-[#8391A1]">
                              {item.description || "No description available"}
                            </p>
                          </div>
                        </div>
                      )
                    )}

                  {column.type === "image" && (
                    <Image
                      src={row[column.key]}
                      alt="Image"
                      width={16}
                      height={16}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  {column.type === "select" && column.selectOptions && (
                    <div
                      className="relative inline-block dropdown-container"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className="bg-[#D8ECFD] dark:bg-darkButtonBg dark:text-white text-[#1768D0] p-2 rounded cursor-pointer"
                        onClick={() =>
                          setIsDropdownOpen(
                            isDropdownOpen === `${rowIndex}-${column.key}`
                              ? null
                              : `${rowIndex}-${column.key}`
                          )
                        }
                      >
                        {row[column.key] || "Select Action"}
                      </div>
                      {isDropdownOpen === `${rowIndex}-${column.key}` && (
                        <ul className="absolute left-0 max-w-[250px] bg-white dark:bg-darkPrimaryBg  border border-gray-300 dark:border-gray-700 rounded mt-1 shadow-md z-10 animate-slide-down">
                          {column.selectOptions.map((option, index) => (
                            <li
                              key={`${row.id || rowIndex}-opt-${index}`}
                              className="px-4 w-full py-2 transition-all duration-200 dark:text-gray-300 hover:bg-[#D8ECFD] hover:text-[#1768D0] cursor-pointer dark:hover:text-gray-800"
                              onClick={() => {
                                Swal.fire({
                                  title: "Are you sure?",
                                  text: `Do you want to select "${option}"?`,
                                  icon: "question",
                                  showCancelButton: true,
                                  width: "300px", // Adjust width of the popup
                                  heightAuto: true, // Adjust height based on content
                                  confirmButtonColor: "#1768D0",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Yes, select it!",
                                  cancelButtonText: "No, cancel",
                                  customClass: {
                                    popup: "tw-swal-popup", // Popup container styles
                                    title: "tw-swal-title", // Title styles
                                    htmlContainer: "tw-swal-content", // Content (text) styles
                                    confirmButton: "tw-swal-confirm", // Confirm button styles
                                    cancelButton: "tw-swal-cancel", // Cancel button styles
                                  },
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    // Update the row data first
                                    row[column.key] = option; // Update the value immediately
                                    column.onSelectChange?.(row, option); // Trigger callback if needed

                                    // Keep dropdown open to reflect changes
                                    setIsDropdownOpen(
                                      `${rowIndex}-${column.key}`
                                    );

                                    // Show success alert after a delay
                                    Swal.fire({
                                      title: "Selected!",
                                      text: `"${option}" has been selected.`,
                                      icon: "success",
                                      timer: 1500,
                                      showConfirmButton: false,
                                      customClass: {
                                        popup: "tw-swal-popup", // Popup container styles
                                        title: "tw-swal-title", // Title styles
                                        htmlContainer: "tw-swal-content", // Content (text) styles
                                        confirmButton: "tw-swal-confirm", // Confirm button styles
                                        cancelButton: "tw-swal-cancel", // Cancel button styles
                                      },
                                    }).then(() => {
                                      // Close the dropdown after success message
                                      setIsDropdownOpen(null);
                                    });
                                  } else {
                                    // Keep dropdown open if canceled
                                    setIsDropdownOpen(
                                      `${rowIndex}-${column.key}`
                                    );
                                  }
                                });
                              }}
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
