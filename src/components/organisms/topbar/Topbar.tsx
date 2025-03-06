import { Button } from "@/components/atoms/Button";
import Breadcrumb from "@/components/molecules/global/Breadcumb";
import Theme from "@/components/molecules/global/Theme";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { CiMail } from "react-icons/ci";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { FaAngleDown, FaWallet } from "react-icons/fa";
import flag from "/public/topbar/flag.svg";
import admin from "/public/topbar/admin.png";
import { Menu } from "lucide-react";
import Profile from "@/components/molecules/Topbar/Profile";
import Link from "next/link";
import Span from "@/components/atoms/Span";

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { isOpen, toggle, close, ref };
};

interface TopBarProps {
  handleHamburgerClick: () => void;
}

const Topbar: React.FC<TopBarProps> = ({ handleHamburgerClick }) => {
  const languageDropdown = useDropdown();
  const adminDropdown = useDropdown();
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  // Controls whether the mobile "expanded" menu is open
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLanguageSelection = (language: string) => {
    setSelectedLanguage(language);
    languageDropdown.close();
  };

  return (
    <div className="flex items-center justify-between bg-white p-3 shadow-sm rounded-md sticky top-0 z-50 flex-shrink-0 dark:bg-darkPrimaryBg dark:text-white">
      {/* Breadcrumb Section */}
      <div className="ml-4 flex gap-x-2 items-center">
        <Button
          onClick={handleHamburgerClick}
          className="w-10 h-10  lg:hidden  "
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-6 h-6 text-gray-700 dark:text-white" />
        </Button>
        <Button className="text-black text-xs sm:text-xs md:text-base font-semibold m-0 md:mt-0">
          <Breadcrumb />
        </Button>
      </div>

      {/* Right side content */}
      {/* Right side content */}
      <div className="flex items-center gap-2 relative">
        {/* MOBILE ONLY: The "txt" button that toggles the rest of the icons */}
        <Button
          className="bg-[#F4F7FE4D] relative text-[#8391A1] shadow-sm p-2 rounded-full dark:bg-darkButtonBg dark:text-white block md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </Button>

        {/* This entire block is always shown on desktop (md:flex), 
            and shown on mobile only when isMobileMenuOpen is true */}
        <div
          className={`
            ${
              isMobileMenuOpen
                ? "flex flex-col md:flex-row absolute top-12 right-5   bg-white dark:bg-darkPrimaryBg rounded-md shadow-md  animate-slide-down px-4 py-2"
                : "hidden top-0 right-0 "
            } 
            md:flex 
            gap-5
            items-center
            md:mt-0
            ml-3
          `}
        >
          {/* Action Buttons: Mail & Notifications */}
          <div
            className="flex flex-col md:flex-row gap-2 dark:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex items-center gap-2">
              <Link
                href="/wallet"
                className="bg-[#F4F7FE4D] relative text-[#8391A1] shadow-sm p-2 rounded-full dark:bg-darkButtonBg dark:text-white"
              >
                <FaWallet size={18} />
              </Link>
              <Span className="text-xs md:hidden">Wallet</Span>
            </div>

            <div className="flex items-center gap-2">
              <Button className="bg-[#F4F7FE4D] relative text-[#8391A1] shadow-sm p-2 rounded-full dark:bg-darkButtonBg dark:text-white">
                <CiMail size={18} />
                <span className="bg-[#f23e43] text-white p-[2px] text-[6px] rounded-full absolute top-0 right-0">
                  99+
                </span>
              </Button>
              <Span className="text-xs md:hidden">Mail</Span>
            </div>

            <div className="flex items-center gap-2">
              <Button className="bg-[#F4F7FE4D] relative text-[#8391A1] shadow-sm p-2 rounded-full dark:bg-darkButtonBg dark:text-white">
                <IoMdNotificationsOutline size={18} />
                <span className="bg-[#f23e43] text-white p-[2px] text-[6px] rounded-full absolute top-0 right-0">
                  99+
                </span>
              </Button>
              <Span className="text-xs md:hidden">Notification</Span>
            </div>
          </div>

          {/* Language Dropdown */}
          <div
            className="flex items-center gap-1 relative -mt-3 md:-mt-0"
            ref={languageDropdown.ref}
            onKeyDown={(event) => {
              if (event.key === "Escape") languageDropdown.close();
            }}
          >
            <Image
              src={flag}
              width={50}
              height={50}
              alt="flag"
              className="w-6 h-5 cursor-pointer"
              onClick={languageDropdown.toggle}
            />
            <Button
              className="mr-0 sm:mr-2  text-[#8391A1] bg-white rounded p-1 text-sm relative cursor-pointer dark:bg-darkButtonBg dark:text-white"
              onClick={languageDropdown.toggle}
              aria-haspopup="true"
              aria-expanded={languageDropdown.isOpen}
            >
              <span className="flex items-center gap-1">
                {selectedLanguage}
                <FaAngleDown />
              </span>
            </Button>
            {languageDropdown.isOpen && (
              <ul className="absolute animate-slide-down bg-white shadow-md rounded w-24 top-10 border z-10">
                {["English", "Bangla", "Arabic"].map((language) => (
                  <li
                    key={language}
                    className="px-4 py-2 text-sm text-[#8391A1] hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleLanguageSelection(language);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {language}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Theme Toggle */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 -ml-6 -mt-3 md:-mt-0"
          >
            <Theme />
          
          </div>
        </div>
        {/* Admin Dropdown */}
        <div
          className="flex items-center gap-3 relative"
          ref={adminDropdown.ref}
        >
          <Image
            src={admin}
            width={50}
            height={50}
            alt="admin"
            className="w-8 h-8 cursor-pointer"
            onClick={adminDropdown.toggle}
          />
          <Button
            className="hidden sm:flex items-center text-sm text-[#8391A1] dark:text-white"
            onClick={adminDropdown.toggle}
            aria-haspopup="true"
            aria-expanded={adminDropdown.isOpen}
          >
            Admin <FaAngleDown />
          </Button>
          {adminDropdown.isOpen && (
            <ul className="absolute animate-slide-down bg-white shadow-md rounded right-72 sm:right-56 w-full top-12 border z-10">
              <li onClick={() => adminDropdown.close()}>
                <Profile />
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
