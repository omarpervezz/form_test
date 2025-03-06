import { BookingDataType } from "@/hooks/api/v1/useFetchData";
import { TableType } from "./api";
interface ActionButtonType {
  label: React.ReactNode;
  onClick: () => void;
  icon: React.ReactNode;
  className: string;
}
export interface BookingPropsType {
  data: BookingDataType[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  actionButton?: ActionButtonType[];
}

export interface FormData {
  firstName: string;
  lastName: string;
  emails: string[];
  phoneNumbers: string[];
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  isChangingPassword: boolean;
  addresses: Address[];
}

// for table filter data
interface ActionButtonType {
  label: React.ReactNode;
  onClick: () => void;
  icon: React.ReactNode;
  className?: string;
}
export interface TableFilterPropsTypes {
  data: TableType[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  actionButton: ActionButtonType[];
  isLoading: boolean;
}

export interface PackageTableFilterPropsTypes {
  data: TableType[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}
