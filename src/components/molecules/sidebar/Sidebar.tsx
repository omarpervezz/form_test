import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarHeader from "./SidebarHeader";
import {
  DashboardIcon,
  EmployeeIcon,
  CompanyIcon,
} from "@/components/atoms/Icons";

import { HiOutlineLogout } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import Backdrop from "../global/Backdrop";
import { X } from "lucide-react";
type SidebarItem = {
  label: string;
  href: string;
  icon: React.ElementType<{
    fill?: string;
    width?: number;
    height?: number;
    className?: string;
  }>;
};

const items: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { label: "Package", href: "/package-upload", icon: CompanyIcon },
  { label: "Package List", href: "/package-list", icon: CompanyIcon },
  { label: "Vendor", href: "/vendor-add", icon: EmployeeIcon },
  { label: "Hajj Package", href: "/hajj-upload", icon: EmployeeIcon },
  { label: "Add Banner", href: "/add-banner", icon: EmployeeIcon },
  { label: "Add Airport", href: "/add-airport", icon: EmployeeIcon },
  { label: "Add Country", href: "/add-country", icon: EmployeeIcon },
  { label: "Add City", href: "/add-city", icon: EmployeeIcon },
  { label: "Blog Info", href: "/blog-info", icon: EmployeeIcon },
];

interface SidebarProps {
  toggleAppSlidebar: () => void;
  isOpen: boolean;
  isMobileMenuOpen: boolean;
  handleHamburgerClick: () => void;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  toggleAppSlidebar,
  isOpen,
  isMobileMenuOpen,
  handleHamburgerClick,
  setIsMobileMenuOpen,
}) => {
  const rawPathname = usePathname();
  const pathname = rawPathname === "/" ? "/dashboard" : rawPathname;

  return (
    <div>
      {/* Sidebar */}
      <Backdrop onClick={handleHamburgerClick} isVisible={isMobileMenuOpen} />
      <div
        className={cn(
          "fixed top-0 left-0 z-[61] bg-white shadow-lg dark:bg-darkPrimaryBg h-screen lg:h-[calc(100vh-40px)] transition-all duration-300 transform",
          isMobileMenuOpen
            ? "translate-x-0 scale-100 shadow-active "
            : "-translate-x-full shadow-hidden",
          "lg:translate-x-0 lg:top-5 lg:left-5 lg:rounded-md lg:shadow-none",
          isOpen || isMobileMenuOpen ? "w-56" : "w-20"
        )}
      >
        {/* Sidebar Wrapper */}
        <div className="flex flex-col h-full gap-y-3 relative">
          <Button
            className="hover:bg-[#F5F7FA] px-1 py-1 absolute right-1 top-1 rounded-full block lg:hidden z-[62]"
            onClick={handleHamburgerClick}
          >
            <X className="w-5 h-5 text-gray-500" />
          </Button>
          {/* Sidebar Header */}
          <SidebarHeader
            isOpen={isOpen || isMobileMenuOpen}
            toggleAppSlidebar={toggleAppSlidebar}
          />

          {/* Navigation Items */}
          <nav className="flex-grow overflow-y-auto space-y-2 nav-no-scrollbar dark:text-white px-3">
            {items.map((item, index) => {
              const Icon = item.icon;
              // const isActive = pathname.startsWith(item.href);
              const isActive =
                item.href === "/"
                  ? pathname === "" // Root is only active when there's no specific path
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 p-3 text-sm font-normal rounded-md transition-all duration-200 dark:text-white",
                    "hover:text-white hover:bg-[#1768D0]",
                    isActive
                      ? "bg-[#1768D0] text-white dark:text-white"
                      : "text-gray-700 dark:text-white",
                    !(isOpen || isMobileMenuOpen) && "justify-center"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center transition-colors duration-200",
                      isActive
                        ? "text-white dark:text-white"
                        : "text-gray-900 group-hover:text-white dark:text-white dark:group-hover:text-white"
                    )}
                  >
                    <Icon
                      fill="currentColor"
                      className="h-5 w-5 transition-colors duration-200"
                    />
                  </div>

                  {(isOpen || isMobileMenuOpen) && (
                    <span
                      className={cn(
                        "transition-opacity duration-200 dark:text-white",
                        isActive
                          ? "text-white"
                          : "text-gray-700 group-hover:text-white dark:text-white"
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout Section */}
          <div className="flex-shrink-0 border-t-2 py-3 border-gray-100 dark:border-gray-900 dark:text-white">
            <Link
              href="#"
              className={cn(
                "group flex items-start gap-3 p-3 text-xs font-normal rounded-md transition-all duration-300 hover:text-white hover:bg-[#1768D0] dark:text-white",
                pathname === "#" && "bg-[#1768D0] text-white",
                !(isOpen || isMobileMenuOpen) && "justify-center",
                "text-gray-700"
              )}
            >
              <HiOutlineLogout className="dark:text-white" size={20} />

              {(isOpen || isMobileMenuOpen) && "Logout"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
