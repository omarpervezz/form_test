// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { IoMdSearch } from "react-icons/io";
// import { CiMail } from "react-icons/ci";

// import { IoMdNotificationsOutline } from "react-icons/io";
// import { FaAngleDown } from "react-icons/fa6";
// import Image from "next/image";
// import flag from "/public/topbar/flag.svg";
// import admin from "/public/topbar/admin.png";
// import { Button } from "@/components/atoms/Button";
// import Theme from "../global/Theme";
// import Link from "next/link";
// const useDropdown = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);

//   const toggle = () => setIsOpen((prev) => !prev);
//   const close = () => setIsOpen(false);

//   const handleClickOutside = (event: MouseEvent) => {
//     if (ref.current && !ref.current.contains(event.target as Node)) {
//       close();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return { isOpen, toggle, close, ref };
// };

// const TopRight: React.FC = () => {
//   const languageDropdown = useDropdown();
//   const adminDropdown = useDropdown();
//   const [selectedLanguage, setSelectedLanguage] = useState("English");

//   const handleLanguageSelection = (language: string) => {
//     setSelectedLanguage(language);
//     languageDropdown.close();
//   };

//   return (
//     <div className={` flex items-center gap-5 justify-end  dark:text-white`}>
//       <div className="flex  gap-2 sm:gap-5  sm:items-center">
//         {/* Action Buttons */}
//         <div className="flex gap-2   dark:text-white mr-10 sm:mr-0">
//           <Button className="hidden sm:block bg-[#F4F7FE4D] text-[#8391A1] shadow-sm p-2 rounded-full  dark:bg-darkButtonBg dark:text-white">
//             <IoMdSearch size={18} />
//           </Button>
//           <Button className="bg-[#F4F7FE4D] relative text-[#8391A1] shadow-sm p-2 rounded-full dark:bg-darkButtonBg dark:text-white">
//             <CiMail size={18} />
//             <span className="bg-[#f23e43] text-white p-[2px] text-[6px] rounded-full absolute top-0 right-0">
//               99+
//             </span>
//           </Button>
//           <Button className="bg-[#F4F7FE4D] relative text-[#8391A1] shadow-sm p-2 rounded-full dark:bg-darkButtonBg dark:text-white">
//             <IoMdNotificationsOutline size={18} />
//             <span className="bg-[#f23e43] text-white p-[2px] text-[6px] rounded-full absolute top-0 right-0">
//               99+
//             </span>
//           </Button>
//         </div>

//         {/* Language Dropdown */}
//         <div
//           className="flex items-center gap-1 relative  sm:mt-0"
//           ref={languageDropdown.ref}
//           onKeyDown={(event) => {
//             if (event.key === "Escape") languageDropdown.close();
//           }}
//         >
//           <Image
//             src={flag}
//             width={50}
//             height={50}
//             alt="flag"
//             className="w-6 h-5"
//             onClick={languageDropdown.toggle}
//           />
//           <Button
//             className="hidden sm:block text-[#8391A1] bg-white rounded p-1 text-sm relative cursor-pointer dark:bg-darkButtonBg dark:text-white"
//             onClick={languageDropdown.toggle}
//             aria-haspopup="true"
//             aria-expanded={languageDropdown.isOpen}
//           >
//             <span className="flex items-center gap-1">
//               {selectedLanguage}
//               <FaAngleDown />
//             </span>
//           </Button>
//           {languageDropdown.isOpen && (
//             <ul className="absolute animate-slide-down bg-white shadow-md rounded w-24 top-10  border z-10 ">
//               {["English", "Bangla", "Arabic"].map((language) => (
//                 <li
//                   key={language}
//                   className="px-4 py-2 text-sm text-[#8391A1] hover:bg-gray-100 cursor-pointer"
//                   onClick={() => handleLanguageSelection(language)}
//                 >
//                   {language}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>


//       <div className="flex gap-5 sm:gap-3">

//       {/* moon */}
//       <Theme />

//       {/* Admin Dropdown */}
//       <div className="flex items-center gap-3 relative" ref={adminDropdown.ref}>
//         <Image
//           src={admin}
//           width={50}
//           height={50}
//           alt="flag"
//           className="w-8 h-8 cursor-pointer"
//           onClick={adminDropdown.toggle}
//         />
//         <Button
//           className="hidden sm:flex items-center text-sm text-[#8391A1] dark:text-white"
//           onClick={adminDropdown.toggle}
//           aria-haspopup="true"
//           aria-expanded={adminDropdown.isOpen}
//         >
//           Admin <FaAngleDown />
//         </Button>
//         {adminDropdown.isOpen && (
//           <ul className="absolute animate-slide-down bg-white shadow-md rounded right-0 w-32 top-10 border z-10">
//             <li
//               className="px-4 py-2 text-sm text-[#8391A1] hover:bg-gray-100 cursor-pointer"
//               onClick={() => adminDropdown.close()} // Close dropdown when navigating
//             >
//               <Link href="/profile-info">Profile Info</Link>
//             </li>
//             <li
//               className="px-4 py-2 text-sm text-[#8391A1] hover:bg-gray-100 cursor-pointer"
//               onClick={() => adminDropdown.close()} // Optional: Close dropdown on Logout
//             >
//               Logout
//             </li>
//           </ul>
//         )}
//       </div>
//       </div>
//     </div>
//   );
// };

// export default TopRight;
 