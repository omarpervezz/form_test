import Paragraph from "@/components/atoms/Paragraph";
import Image from "next/image";
import React from "react";
import admin from "/public/admin/customer.png";

import { RiKeyFill } from "react-icons/ri";
import { IoCardOutline } from "react-icons/io5";
import { MdLocationPin, MdLogout, MdManageAccounts } from "react-icons/md";
import { IoMdSync } from "react-icons/io";
import { FaPen, FaRegUserCircle } from "react-icons/fa";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";

const Profile = () => {
  return (
    <div className="rounded-md w-80 bg-white dark:bg-darkPrimaryBg shadow-md">
      <div className="bg-[#1768D0]  rounded-t-md p-3 h-24">
        <Paragraph className="text-center font-semibold text-sm sm:text-base md:text-lg lg:text-lg text-white mt-4">
          JD
        </Paragraph>
      </div>
      <div className="relative">
        <Image
          src={admin}
          alt="img"
          width={150}
          height={150}
          className="h-[70px] w-[70px] absolute -top-8 left-[40%]  rounded-full border-2"
        />
      </div>
      <div className="pb-5">
        <Paragraph className="text-sm sm:text-base md:text-lg lg:text-lg text-gray-700 font-semibold mt-12 text-center dark:text-white">
          Jane Doe
        </Paragraph>
        <Paragraph className="text-sm sm:text-sm  md:text-sm  lg:text-sm font-normal  text-gray-400 text-center">
          janedoe520@gmail.com
        </Paragraph>
      </div>
      {/* icons */}
      <div className="flex justify-center items-center gap-3 pb-5">
        <Link href="" className="bg-[#1768D0] p-2 rounded-full text-white">
          <RiKeyFill size={22} />
        </Link>
        <Link href="" className="bg-[#1768D0] p-2 rounded-full text-white">
          <IoCardOutline size={22} />
        </Link>
        <Link href="" className="bg-[#1768D0] p-2 rounded-full text-white">
          <MdLocationPin size={22} />
        </Link>
      </div>
      <div className="pl-3 ">
        <Paragraph className="text-sm sm:text-sm  md:text-sm  lg:text-sm font-medium  text-gray-500 dark:text-gray-300 flex items-center gap-1">
          <IoMdSync size={20} />
          Sync is on
        </Paragraph>
        <Link
          href="#"
          className="text-sm sm:text-sm  md:text-sm  lg:text-sm font-medium  text-gray-500 py-1 dark:text-gray-300 flex items-center gap-1"
        >
          <FaPen size={12} />
          Customise profile
        </Link>
        <Link
          href="#"
          className="text-sm sm:text-sm  md:text-sm  lg:text-sm font-medium  text-gray-500 flex items-center gap-1 dark:text-gray-300"
        >
          <MdManageAccounts size={20} />
          Manage your account
        </Link>
      </div>
      <p className="w-full h-[2px] bg-[#aecdf4] my-4"></p>
      <div className="pl-3">
        <Paragraph className="text-sm sm:text-sm md:text-sm lg:text-sm font-semibold text-gray-700 dark:text-white">
          Your Other Profiles
        </Paragraph>
        <Link
          href=""
          className="text-sm font-normal text-gray-500 flex items-center gap-1 pt-2 dark:text-gray-300"
        >
          <FaRegUserCircle /> pd sense
        </Link>
        <Link
          href=""
          className="text-sm font-normal text-gray-500 flex items-center gap-1 pt-1 dark:text-gray-300"
        >
          <FaRegUserCircle /> Open Guest Profile
        </Link>
      </div>
      <p className="w-full h-[1px] bg-[#aecdf4] my-4"></p>
      <div className="pl-3 pb-5">
        <Link
          href="#"
          className="text-sm font-normal text-gray-500 flex items-center gap-1 pt-2 dark:text-gray-300"
        >
          <FaRegUserCircle /> Add New Profile
        </Link>
        <Button className="text-sm font-semibold text-gray-600 flex items-center gap-1 pt-1 dark:text-gray-300">
          <MdLogout size={20} />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
